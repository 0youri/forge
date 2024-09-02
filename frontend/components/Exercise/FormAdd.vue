<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Add Exercise to {{ workout.title }}</h2>
        <!-- Form Inputs -->
        <form @submit.prevent="addExercise">
          <input type="text" placeholder="Exercise Name" class="w-full p-2 border rounded mb-4" v-model="exerciseName" />
          <!-- Additional fields here -->
          <div class="flex justify-end space-x-2">
            <button type="button" @click="$emit('close')" class="bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Add</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps(['workout']);
  
  const exerciseName = ref('');
  
  const addExercise = () => {
    console.log('Exercise added to', props.workout.title, ':', exerciseName.value);
    // Add exercise logic here
    $emit('close'); // Close modal after adding exercise
  };
  </script>
  