<template>
  <div class="min-h-dvh bg-gray-800 text-white">
    <div class="container mx-auto p-4 sm:p-6 space-y-4">
      <!-- Workout Item -->
      <draggable 
        v-if="workouts.length"
        v-model="workouts" 
        @end="upDrag"
        item-key="id"
        :disabled="!toggleOptions.orderWorkout"
      >
        <template
          #item="{ element: workout }"
          class="mb-1"
        >
          <Workout 
            :key="workout.documentId"
            :workout="workout"
            :orderWorkout="toggleOptions.orderWorkout"

            @editWorkout="toggleEditWorkout"
            @deleteWorkout="toggleDeleteWorkout"
            @deleteStats="toggleDeleteStats"
          />
        </template>
      </draggable>

      <div v-else>
        <p class="text-center italic">No workouts found</p>
      </div>

      <!-- Add Workout Button -->
      <div class="flex justify-center md:justify-end mt-6 space-x-4">
        <button
          v-if="workouts.length > 1"
          @click="toggleOrderWorkout"
          class="flex items-center text-sm sm:text-base justify-center border border-gray-500 text-white px-6 py-3 rounded-md transition"
          :class="toggleOptions.orderWorkout ? 'bg-yellow-600 hover:bg-yellow-500' : 'hover:bg-gray-700'"
        >
          <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
          </svg>
          {{ toggleOptions.orderWorkout ? 'Stop reorder' : 'Reorder'}}
        </button>
        <button @click="toggleAddWorkout" class="flex items-center text-sm sm:text-base whitespace-nowrap justify-center border border-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a1 1 0 01-1-1V11H3a1 1 0 110-2h6V3a1 1 0 112 0v6h6a1 1 0 110 2h-6v6a1 1 0 01-1 1z" clip-rule="evenodd" />
          </svg>
          Add Workout
        </button>
      </div>
      <!-- Modal Components -->
      <WorkoutFormAdd 
        v-if="toggleOptions.addWorkout"
        @dismiss="toggleAddWorkout"
      />
      <WorkoutFormEdit 
        v-if="toggleOptions.editWorkout"
        @dismiss="toggleEditWorkout"
        :workout="workout"
      />
      <WorkoutFormDelete
        v-if="toggleOptions.deleteWorkout"
        :workout="workout"
        @dismiss="toggleDeleteWorkout"
      />

      <StatsFormDelete
        v-if="toggleOptions.deleteStats"
        :workout="workout"
        @dismiss="toggleDeleteStats"
      />
    </div>

    
  </div>
</template>


  
<script setup lang="ts">
  definePageMeta({
    middleware: 'auth'
  })
  
  import { useWorkoutStore } from '~/store/workout'
  import { storeToRefs } from 'pinia'
  import draggable from 'vuedraggable'

  const workoutStore = useWorkoutStore()
  const { getWorkouts, updateWorkoutOrder } = workoutStore
  const { workouts } = storeToRefs(workoutStore)

  onMounted(() => {
    getWorkouts()
  })

  const toggleOptions = ref({
    addWorkout: false,
    editWorkout: false,
    orderWorkout: false,
    addExercise: false,
    deleteWorkout: false,
    deleteStats: false,
  });
 

  const toggleAddWorkout = () => {
    toggleOptions.value.addWorkout = !toggleOptions.value.addWorkout;
  }

  const workout = ref<Object>()
  const toggleEditWorkout = (data: any) => {
    toggleOptions.value.editWorkout = !toggleOptions.value.editWorkout;
    workout.value = data
  }
  const toggleDeleteWorkout = (data: any) => {
    toggleOptions.value.deleteWorkout = !toggleOptions.value.deleteWorkout
    workout.value = data
  } 
  const toggleDeleteStats = (data: any) => {
    toggleOptions.value.deleteStats = !toggleOptions.value.deleteStats
    workout.value = data
  }

  const toggleOrderWorkout = () => {
    toggleOptions.value.orderWorkout = !toggleOptions.value.orderWorkout
  }

  const upDrag = () => {
    updateWorkoutOrder()
  };
</script>
  
<style>
/* Add any styles here */
</style>
  