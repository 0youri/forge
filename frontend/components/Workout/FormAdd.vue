<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Add Workout</h2>
        <!-- Form Inputs -->
        <form @submit.prevent="add">
          <label>Rank</label>
          <input 
            type="text"
            placeholder="number"
            class="w-full p-2 mt-1 border rounded mb-4 text-black bg-gray-300 outline outline-offset-1 outline-2 outline-yellow-500"
            v-model="rank"
            disabled
          />
          <label>Name</label>
          <input 
            type="text"
            placeholder="Name"
            class="w-full p-2 mt-1 border rounded mb-4 text-black outline outline-offset-1 outline-2 outline-yellow-500"
            v-model="name"
          />
          <label>Type</label>
          <input 
            type="text"
            placeholder="Type"
            class="w-full p-2 mt-1 border rounded mb-4 text-black outline outline-offset-1 outline-2 outline-yellow-500"
            v-model="type"
          />
          
          <!-- Additional fields here -->
          <div class="flex justify-end space-x-2">
            <button type="button" @click='$emit("dismiss")' class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</button>
            <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500">Add</button>
          </div>
        </form>
      </div>
      {{ workouts.length }}
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

  const add = () => {
    addWorkout(name.value, type.value, rank.value)
    emit('dismiss')
  };
</script>