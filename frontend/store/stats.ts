import { defineStore } from 'pinia'
import type { Stat } from '~/types/Stat'
import type { Exercise } from '~/types/Exercise'
import type { Workout } from '~/types/Workout'

export const useStatsStore = defineStore('statsStore', () => {
    // State
    const { find, findOne, create, delete: _delete } = useStrapi()
    const client = useStrapiClient()
    const user = useStrapiUser()
    const statsExercise = ref([])
    const statsWorkout = ref([])

    // Actions & getters
    async function getStatsExercise(exerciseId: string) {
        try {
            const { data } = await findOne<Exercise>("exercises", exerciseId, {
                populate: "*",
                status: 'published',
            });
    
            statsExercise.value = data?.stats || [];
        } catch (e) {
            throw e;
        }
    }
    

    async function getStatsWorkout(workoutId: string) {
        try {
            const { data } = await findOne<Workout>("workouts", workoutId, {
                populate: {
                    exercises: {
                        populate: {
                            stats: {
                                sort: ['date:desc'],
                            },
                            
                        },
                        sort: ['rank:asc'],
                    }
                },
                status: 'published',
            })
            if (data?.exercises) {
                statsWorkout.value = data.exercises.map(exercise => {
                    exercise.stats = exercise?.stats?.slice(0, 3) || [];
                    return exercise;
                });
            }
        } catch (e) {
            throw e;
        }
    }
    
    async function addStat(exerciseId: string, reps: string, weight: string) {
        try {
            const newStat: Stat = {
                date: getDate(),
                reps,
                weight,
                exercise: exerciseId,
            };
    
            await create<Stat>("stats", newStat);
        } catch (e) {
            throw e;
        }
    }

    async function deleteStatsExercise(exerciseId: string) {
        try {
            await getStatsExercise(exerciseId);
    
            if (statsExercise.value?.length) {
                await Promise.all(
                    statsExercise.value.map((stat: Stat) => 
                        _delete<Stat>("stats", stat.documentId)
                    )
                );
            }
        } catch (e) {
            throw e;
        }
    }
    

    async function deleteStatsWorkout(workoutId: string) {
        try {
            await getStatsWorkout(workoutId);
            const tempStats = statsWorkout.value?.flatMap((exercise: any) => exercise.stats || []) || [];
            if (tempStats?.length) {
                await Promise.all(
                    tempStats.map((stat: Stat) => 
                        _delete<Stat>("stats", stat.documentId)
                    )
                );
            }
        } catch (e) {
            throw e;
        }
    }
    
    return { 
        getStatsExercise, statsExercise,
        getStatsWorkout, statsWorkout,
        addStat, deleteStatsExercise, deleteStatsWorkout
      
    }
})