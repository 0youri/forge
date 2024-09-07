import { defineStore } from 'pinia'
import type { Workout } from '~/types'
import type { User } from '~/types'

export const useWorkoutStore = defineStore('workoutStore', () => {
    // State
    const { find, findOne, create, update, delete: _delete  } = useStrapi()
    const user = useStrapiUser()
    const workouts = ref<Workout[]>([])
    const workout = ref<Workout>([])
    const workoutState = ref(0)

    // Actions & getters
    async function getWorkouts() {
        const { data } = await findOne<User>("users", 'me', {
            populate: {
                workouts: {
                    sort: ['rank:asc'], // Sort by rank in ascending order
                },
            },
        }).then(res => {
            return { data: res.workouts }
        }).catch(e => { throw e })
        workouts.value = data
    }

    async function getWorkout(id: number) {
        const { data } = await findOne<Workout>("workouts", id, {
            populate: "*",
        }).then(res => {
            return { data: res.data }
        }).catch(e => { throw e })
        workout.value = data
    }

    async function addWorkout(name: string, type: string, rank: number) {
        const newWorkout: Workout = {
            name: name,
            type: type,
            rank: rank,
            user: user.value
        };
    
        await create<Workout>("workouts", newWorkout).then(res => {
            workouts.value.push(...[{id: res.data.id, name : name, type: type, rank: rank}])
        }).catch(e => { throw e })
    }

    async function editWorkout(id: number, name: string, type: string) {
        const changes: Workout = {
            name: name,
            type: type,
        };
        await update<Workout>("workouts", id, changes).then(() => {
            updateLocalWorkout('edit', { id, changes })
        }).catch(e => { throw e })
    }

    async function deleteWorkout(id: number) {
        updateLocalWorkout('delete', { id })
        await _delete<Workout>("workouts", id).catch(e => { throw e })
    }

    async function updateWorkoutOrder() {
        updateLocalWorkout('order')

        for (let i = 0; i < workouts.value.length; i++) {
            await update<Workout>("workouts", workouts.value[i].id, {
                rank: i + 1,
            })
        }
    }

    const updateLocalWorkout = (state: string, body?: { id?: number, changes?: Workout }) => {
        if ( state === 'order' ) {
            for (let i = 0; i < workouts.value.length; i++) {
                workouts.value[i].rank = i + 1;
            }
        } else if ( state === 'edit' ) { 
            const newWorkout = workouts.value.find((el: { id: number }) => el.id === body.id);

            if (newWorkout && body.changes) {
                if (body.changes.name !== undefined) {
                    newWorkout.name = body.changes.name;
                }
                if (body.changes.type !== undefined) {
                    newWorkout.type = body.changes.type;
                }
            }

        } else if ( state === "delete" ) {
            workouts.value = workouts.value.filter((el: { id: number }) => el.id !== body.id)
        }
    }

    return { 
        getWorkouts, workouts,
        getWorkout, workout,
        addWorkout, editWorkout, deleteWorkout, updateWorkoutOrder
    }
})