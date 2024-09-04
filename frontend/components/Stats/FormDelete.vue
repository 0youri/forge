<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Delete All Stats</h2>
        <p>Are you sure you want to delete all stats for "<i>#{{ workout.rank }} {{ workout.name }}</i>" ?</p>
        <div class="flex justify-end space-x-2 mt-4">
          <button type="button" @click="$emit('dismiss')" class="bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
          <button type="button" @click="_delete" class="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>

  import { useStatsStore } from '~/store/stats'

  const props = defineProps({
    workout: {
        type: Object,
        default: {},
    },
  })  

  const emit = defineEmits(['dismiss']);

  const statsStore = useStatsStore()
  const { deleteStatsWorkout } = statsStore

  const _delete = () => {
    deleteStatsWorkout(props.workout.id)
    emit('dismiss')
  };
</script>
  