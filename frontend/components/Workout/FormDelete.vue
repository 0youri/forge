<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-gray-800 p-6 rounded-lg w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Delete Workout</h2>
        <p>Are you sure you want to delete "<i>#{{ workout.rank }} {{ workout.name }}</i>" ?</p>
        <div class="flex justify-end space-x-2 mt-4">
          <button type="button" @click="$emit('dismiss')" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</button>
          <button type="button" @click="_delete" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>

  import { useWorkoutStore } from '~/store/workout'

  const props = defineProps({
    workout: {
        type: Object,
        default: {},
    },
  })  

  const emit = defineEmits(['dismiss']);

  const workoutStore = useWorkoutStore()
  const { deleteWorkout, updateWorkoutOrder  } = workoutStore

  const _delete = () => {
    deleteWorkout(props.workout.id)
    updateWorkoutOrder()
    emit('dismiss')
  };
</script>
  