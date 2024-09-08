<template>
  <div class="bg-gray-800 h-full">
    <div class="max-w-7xl mx-auto p-6">
      <div class="workout-section mb-8" v-for="exercise in statsWorkout" :key="exercise.id">
        <div class="text-white rounded-t-lg px-2">
          <h2 class="font-bold text-md">
            #{{ exercise.attributes.rank }} {{ exercise.attributes.muscle }} 
            - {{ exercise.attributes.name }} 
            - {{ exercise.attributes.sets }}x{{ exercise.attributes.reps }} 
            - {{ exercise.attributes.weight }}kg
          </h2>
        </div>
        <div class="overflow-x-auto snap-x snap-mandatory">
          <table class="min-w-full bg-gray-900 rounded-t-lg overflow-hidden text-sm pb-10">
            <thead class="bg-gray-700 text-left">
              <tr>
                <th class="p-2 text-gray-300 uppercase tracking-wide min-w-[110px]">Date</th>
                <th class="p-2 text-gray-300 uppercase tracking-wide">Stats</th>
              </tr>
            </thead>
            <tbody class="" >
              <tr v-for="(stat, index) in exercise.attributes.stats.data" :key="stat.id" class="hover:bg-gray-800 mb-2 border-2 border-gray-700 ">
                <td class="p-2 text-white font-medium sm:w-2/12 w-1/2">{{ stat.attributes.date }}</td>
                <td class="p-2 text-gray-300 sm:w-10/12">
                  <table class="text-sm">
                    <thead class="text-left ">
                      <tr>
                        <th class=""></th>
                        <th class="px-5 border" v-for="(rep, idx) in stat.attributes.reps.split(':')" :key="idx">
                          Set {{ idx + 1 }}
                        </th>           
                      </tr>
                    </thead>
                    <tbody class="">
                      <tr>
                        <td class="text-gray-300 px-5 border">Reps</td>
                        <td class="px-5 border" v-for="(rep, idx) in stat.attributes.reps.split(':')" :key="idx">
                          {{ rep }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-gray-300 px-5 border">Weight (kg)</td>
                        <td class="px-5 border" v-for="(rep, idx) in stat.attributes.reps.split(':')" :key="idx">
                          {{ stat.attributes.weight.split(':')[idx] }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useExerciseStore } from '~/store/exercise'
  import { useStatsStore } from '~/store/stats'

  const route = useRoute()
  const router = useRouter()
  const workoutId = route.params.workout

  const { getExercises, getExerciseAddStats } = useExerciseStore()
  const { statsWorkout } = storeToRefs(useStatsStore())
  const { getStatsWorkout } = useStatsStore()


  onMounted(() => {
    getStatsWorkout(workoutId)
  })
</script>