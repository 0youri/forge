<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-gray-800 p-6 rounded-lg w-full max-w-lg mx-5 md:mx-0">
        <h2 class="text-xl font-bold mb-4">Delete Exercise</h2>
        <p class="text-sm md:text-md text-center">Are you sure you want to delete</p>
        <p class="italic text-md md:text-lg text-center font-medium">
          #{{ exercise.rank }} {{ exercise.name }}
        </p>
        <div class="flex justify-end space-x-2 mt-4">
          <button type="button" @click="$emit('dismiss')" class="bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
          <button type="button" @click="_delete" class="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>

  import { useExerciseStore } from '~/store/exercise'

  const props = defineProps({
    workoutId: {
      type: String,
      default: '',
    },
    exercise: {
        type: Object,
        default: {},
    },
  })  

  const emit = defineEmits(['dismiss']);

  const exerciseStore = useExerciseStore()
  const { deleteExercise, updatExerciseOrder } = exerciseStore

  const _delete = () => {
    deleteExercise(props.workoutId, props.exercise.documentId)
    updatExerciseOrder(props.workoutId)
    emit('dismiss') 
  };
</script>
  