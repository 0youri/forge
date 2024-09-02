import { defineStore } from 'pinia'
import type { Exercise } from '~/types/Exercise'
import type { Workout } from '~/types/Workout'

export const useExerciseStore = defineStore('exerciseStore', () => {
    // State
    const { find, findOne, create, update, delete: _delete  } = useStrapi()
    const user = useStrapiUser()
    const exercises = ref<Exercise[]>([])
    const exercise = ref([])
    const exerciseState = ref(0)

    // Actions & getters
    async function getExercises(id: number) {
        const { data } = await findOne<Workout>("workouts", id, {
            populate: {
                exercises: {
                    sort: ['rank:asc'], // Sort by rank in ascending order
                },
            },
        }).then(res => {
            return { data: res.data?.attributes?.exercises?.data }
        }).catch(e => { throw e })
        exercises.value[id] = data
    }

    async function getExercise(id: number) {
        const { data } = await findOne<Exercise>("exercises", id).then(res => {
            return { data: res.data }
        }).catch(e => { throw e })
        exercise.value = data
    }

    async function addExercise(
        muscle: string, 
        name: string,
        sets: string,
        reps: number,
        weight: number,
        rest: number,
        rank: number,
        workout: number
    ) {
        const newExercise: Exercise = {
            muscle: muscle, 
            name: name,
            sets: sets,
            reps: reps,
            weight: weight,
            rest: rest,
            rank: rank,
            workout: workout
        };

        const { data } = await create<Exercise>("exercises", newExercise).then(res => {
            return { data: res.data }
        }).catch(e => { throw e })
        // console.log(data) -> return response with id, name, type, rank and some dates
    }

    async function editExercise(
        workoutId: number,
        id: number,
        muscle: string, 
        name: string,
        sets: string,
        reps: number,
        weight: number,
        rest: number,
    ) {
        const changes: Exercise = {
            muscle: muscle, 
            name: name,
            sets: sets,
            reps: reps,
            weight: weight,
            rest: rest,
        };

        const { data } = await update<Exercise>("exercises", id, changes).then(res => {
            return { data: res.data }
        }).catch(e => { throw e })

        updateLocalExercise('edited', workoutId, {id, changes})
    }

    async function deleteExercise(id: string | number) {
        const { data } = await _delete<Exercise>("exercises", id).then(res => {
            return { data: res.data }
        }).catch(e => { throw e })
        // console.log(data) -> return response with id, name, type, rank and some dates
    }

    async function updatExerciseOrder(workoutId: number) {
        updateLocalExercise('order', workoutId)

        for (let i = 0; i < exercises.value[workoutId].length; i++) {
            await update<Exercise>("exercises",  exercises.value[workoutId][i].id, {
                rank: i + 1,
            })
        }
    }

    const updateLocalExercise = (state: string, workoutId?: number, body?: { id?: number, changes?: Exercise }) => {
        if ( state === 'order' ) {
            for (let i = 0; i < exercises.value[workoutId].length; i++) {
                exercises.value[workoutId][i].attributes.rank = i + 1;
            }
        } else if ( state === 'edited' ) { 
            const newExercise = exercises.value[workoutId].find((el: { id: number }) => el.id === body.id).attributes;
            if (newExercise && body.changes) {
                if (body.changes.muscle !== undefined) {
                    newExercise.muscle = body.changes.muscle;
                }
                if (body.changes.name !== undefined) {
                    newExercise.name = body.changes.name;
                }
                if (body.changes.sets !== undefined) {
                    newExercise.sets = body.changes.sets;
                }
                if (body.changes.reps !== undefined) {
                    newExercise.reps = body.changes.reps;
                }
                if (body.changes.weight !== undefined) {
                    newExercise.weight = body.changes.weight;
                }
                if (body.changes.rest !== undefined) {
                    newExercise.rest = body.changes.rest;
                }
            }
        }
    }

    function getExercisesByWorkoutId(id) {
        return exercises.value[id] || [];
    }

    return { 
       getExercises, exercises,
       getExercise, exercise,
       addExercise, editExercise, deleteExercise, updatExerciseOrder,
       getExercisesByWorkoutId,
    }
})