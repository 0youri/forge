<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Add Workout</h2>
        <!-- Form Inputs -->
        <form @submit.prevent="add">
          <label>Name</label>
          <input 
            type="text"
            placeholder="Name"
            class="w-full p-2 mt-1 border rounded  text-black outline outline-offset-1 outline-2"
            :class="errorName ? 'mb-2 outline-red-500' : 'mb-4 outline-yellow-500'"
            v-model="name"
          />
          <div v-if="errorName" class="flex text-red-500 text-sm items-center gap-1 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
            </svg>

            {{ errorName }}
          </div>
          <label>Type</label>
          <input 
            type="text"
            placeholder="Type"
            class="w-full p-2 mt-1 border rounded text-black outline outline-offset-1 outline-2"
            :class="errorType ? 'mb-2 outline-red-500' : 'mb-4 outline-yellow-500'"
            v-model="type"
          />
          <div v-if="errorType" class="flex text-red-500 text-sm items-center gap-1 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
            </svg>

            {{ errorType }}
          </div>
          
          <!-- Additional fields here -->
          <div class="flex justify-end space-x-2">
            <button type="button" @click='$emit("dismiss")' class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</button>
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">Add</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
<script setup>
  import { useWorkoutStore } from '~/store/workout'
  import { storeToRefs } from 'pinia'  

  const emit = defineEmits(['dismiss']);

  const workoutStore = useWorkoutStore()
  const { addWorkout } = workoutStore
  const { workouts } = storeToRefs(workoutStore)

  const name = ref('')
  const type = ref('')
  const rank = computed(() => workouts.value.length+1)

  const errorName = ref('')
  const errorType = ref('')

  const add = () => {
    if( name.value !== '' && type.value !== '' ){
      addWorkout(name.value, type.value, rank.value)
      emit('dismiss')
    } else {
      if ( name.value === '' ){
        errorName.value = 'Please enter the workout name'
      } else {
        errorName.value = ''
      }
      if ( type.value === '' ){
        errorType.value = 'Please enter the workout type'
      } else {
        errorType.value = ''
      }
    }
  }
</script>