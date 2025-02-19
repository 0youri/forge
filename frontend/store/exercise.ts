import { defineStore } from 'pinia'
import type { Exercise } from '~/types/Exercise'
import type { Workout } from '~/types/Workout'

export const useExerciseStore = defineStore('exerciseStore', () => {
    // State
    const { find, findOne, create, update, delete: _delete  } = useStrapi()
    const user = useStrapiUser()
    const exercises = ref<Exercise[]>([])
    const exercise = ref([])

    // Actions & getters
    async function getExercises(workoutId: string) {
        const { data } = await findOne<Workout>("workouts", workoutId, {
            populate: {
                exercises: {
                    sort: ['rank:asc'], // Sort by rank in ascending order
                },
            },
            status: 'published',
        }).then(res => {
            return { data: res.data?.exercises  }
        }).catch(e => { throw e })
        exercises.value[workoutId] = data

    }

    async function getExercise(exerciseId: number) {
        const { data } = await findOne<Exercise>("exercises", exerciseId, {
            status: 'published',
        }).then(res => {
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
        workout: string
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
        }

        const { data } = await create<Exercise>("exercises", newExercise).then(res => {
            return { data: res.data }
        }).catch(e => { 
            console.log(e)
        })
        updateLocalExercise('add', workout, data)
    }

    async function editExercise(
        workoutId: string,
        exerciseId: string,
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

        const { data } = await update<Exercise>("exercises", exerciseId, changes).then(res => {
            return { data: res.data }
        }).catch(e => { throw e })

        updateLocalExercise('edit', workoutId, { id: exerciseId, changes})
    }

    async function deleteExercise(
        workoutId: string,
        exerciseId: string
    ) {
        updateLocalExercise('delete', workoutId, { id: exerciseId })
        await _delete<Exercise>("exercises", exerciseId).catch(e => { throw e })
    }

    async function deleteExercises(workoutId: string) {
            try {
                const tempExercises = getExercisesByWorkoutId(workoutId);
                if (tempExercises?.length) {
                    await Promise.all(
                        tempExercises.map((exercise: any) => 
                            _delete<Exercise>("exercises", exercise.documentId)
                        )
                    );
                }
            } catch (e) {
                throw e;
            }
        }

    async function updatExerciseOrder(workoutId: string) {
        updateLocalExercise('order', workoutId)
        for (let i = 0; i < exercises.value[workoutId].length; i++) {
            await update<Exercise>("exercises",  exercises.value[workoutId][i].documentId, {
                rank: i + 1,
            })
        }
    }

    const updateLocalExercise = (state: string, workoutId?: string, body?: { id?: string, changes?: Exercise }) => {
        if ( state === 'order' ) {
            for (let i = 0; i < exercises.value[workoutId].length; i++) {
                exercises.value[workoutId][i].rank = i + 1
            }
        } else if ( state === 'edit' ) { 
            const newExercise = exercises.value[workoutId].find((el: { documentId: string }) => el.documentId === body.id);
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
        } else if ( state === "delete" ) {
            exercises.value[workoutId] = exercises.value[workoutId].filter((el: { documentId: string }) => el.documentId !== body.id)
        } else if ( state === "add" ) {
            exercises.value[workoutId].push(...[body])
        }
    }

    function getExercisesByWorkoutId(workoutId: string) {
        return exercises.value[workoutId] || [];
    }

    function getExerciseAddStats(workoutId: string, rank: number) {
        return exercises.value?.[workoutId]?.[rank] || []
    }

    return { 
       getExercises, exercises,
       getExercise, exercise,
       addExercise, editExercise, deleteExercise, updatExerciseOrder, deleteExercises,
       getExercisesByWorkoutId, getExerciseAddStats
    }
})