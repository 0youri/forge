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
    async function getStatsExercise(id: number) {
        try {
            const { data } = await findOne<Exercise>("exercises", id, {
                populate: "*"
            });
    
            statsExercise.value = data?.attributes?.stats?.data || [];
        } catch (e) {
            throw e;
        }
    }
    

    async function getStatsWorkout(id: number) {
        try {
            const { data } = await findOne<Workout>("workouts", id, {
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
                
            })
    
            if (data?.attributes?.exercises?.data) {
                statsWorkout.value = data.attributes.exercises.data.map(exercise => {
                    exercise.attributes.stats.data = exercise?.attributes?.stats?.data?.slice(0, 3) || [];
                    return exercise;
                });
            }
        } catch (e) {
            throw e;
        }
    }
    
    async function addStat(exercise: number, reps: string, weight: string) {
        try {
            const newStat: Stat = {
                date: getDate(),
                reps,
                weight,
                exercise
            };
    
            await create<Stat>("stats", newStat);
        } catch (e) {
            throw e;
        }
    }

    async function deleteStatsExercise(id: number) {
        try {
            await getStatsExercise(id);
    
            if (statsExercise.value?.length) {
                await Promise.all(
                    statsExercise.value.map((stat: Stat) => 
                        _delete<Stat>("stats", stat.id)
                    )
                );
            }
        } catch (e) {
            throw e;
        }
    }
    

    async function deleteStatsWorkout(id: number) {
        try {
            await getStatsWorkout(id);
            const tempStats = statsWorkout.value?.flatMap((exercise: any) => exercise.attributes?.stats?.data || []) || [];
            if (tempStats?.length) {
                await Promise.all(
                    tempStats.map((stat: Stat) => 
                        _delete<Stat>("stats", stat.id)
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