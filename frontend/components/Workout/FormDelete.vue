<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Delete Workout</h2>
        <p>Are you sure you want to delete "{{ workout.title }}"?</p>
        <div class="flex justify-end space-x-2 mt-4">
          <button type="button" @click="$emit('close')" class="bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
          <button type="button" @click="deleteWorkout" class="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['workout']);
  
  const deleteWorkout = () => {
    console.log('Workout deleted:', props.workout.title);
    // Delete workout logic here
    $emit('close'); // Close modal after deleting workout
  };
  </script>
  