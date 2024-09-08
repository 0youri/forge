<template>
  <div class="fixed inset-0 bg-gray-900 flex justify-center items-center">
    <div class="bg-gray-800 p-6 rounded-lg w-full max-w-md">
      <div v-if="isLoading" class="fixed inset-0 bg-gray-900 flex justify-center items-center">
        <svg class="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clip-rule="evenodd" />
        </svg>
      </div>
      <div v-else>
        <h2 v-if="exercise" class="text-xl text-white font-bold mb-4">
          #{{ exercise.attributes?.rank }} {{ exercise.attributes?.muscle }} / {{ exercise.attributes?.name }}
          <span class="block text-sm text-gray-300">
            {{ exercise.attributes?.sets }}x{{ exercise.attributes?.reps }}, 
            {{ exercise.attributes?.weight }}kg, {{ exercise.attributes?.rest }}min rest
          </span>
        </h2>
        <form @submit.prevent="add">
          <div class="grid grid-cols-1 gap-2">
            <div class="grid grid-cols-2 text-gray-300 font-bold">
              <span>Reps</span>
              <span>Weight</span>
            </div>
            <div
              v-for="(set, index) in setsData"
              :key="index"
              class="flex justify-between items-center space-x-2"
            >
                <input
                    v-model="set.reps.value"
                    :placeholder="exercise.attributes?.reps"
                    type="number"
                    min="0"
                    step=".01"
                    class="w-full p-2 border rounded text-black outline outline-offset-0 outline-2"
                    :class="set.reps.error || 'outline-yellow-500'"
                />
                <input
                    v-model="set.weight.value"
                    :placeholder="exercise.attributes?.weight"
                    type="number"
                    min="0"
                    step=".01"
                    class="w-full p-2 border rounded text-black outline outline-offset-0 outline-2"
                    :class="set.weight.error || 'outline-yellow-500'"
                />
            </div>
          </div>
          <div v-if="errorMessage" class="flex text-red-500 text-sm items-center gap-1 mt-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
              </svg>
              {{ errorMessage }}
          </div>

          <div v-if="isLoading" class="flex justify-center items-center mt-4">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8l4 4"></path>
            </svg>
          </div>
          <div class="flex justify-end space-x-2 mt-4">
            <NuxtLink to="/" type="button" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</NuxtLink>
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">Submit</button>
          </div>
        </form>
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
  const rank = route.params.rank - 1

  const { getExercises, getExerciseAddStats } = useExerciseStore()
  const { addStat } = useStatsStore()
  
  const exercise = computed(() => getExerciseAddStats(workoutId, rank))
  const setsData = ref([])
  const errorMessage = ref('')
  const isLoading = ref(false)

  onMounted(() => {
    getExercises(workoutId)
  })

  watch(exercise, () => {
    if (!exercise?.value?.attributes?.sets) {
      router.push('/')
    } else {
      setsData.value = Array.from({ length: exercise.value.attributes.sets }, () => ({
        reps: { value: '', error: '' },
        weight: { value: '', error: '' },
      }))
    }
  })
  
  const add = () => {
    if (setsData.value.length) {
      isLoading.value = true

      setTimeout(() => {
        const repsString = setsData.value.map(set => set.reps.value || exercise.value.attributes.reps).join(':')
        const weightString = setsData.value.map(set => set.weight.value || exercise.value.attributes.weight).join(':')

        addStat(exercise.value.id, repsString, weightString)
        isLoading.value = false
        router.push(`${rank + 2}`)
      }, 250)
    }
  }
</script>