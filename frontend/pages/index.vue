<template>
  <div class="min-h-screen bg-black text-white">
    <div class="container mx-auto p-4 sm:p-6 space-y-4">
      <!-- Workout Item -->
      <draggable 
          v-model="workouts" 
          @end="upDrag"
          item-key="id"
        >
        <template
          #item="{ element: workout }"
          class="mb-1"
        >
          <Workout 
            :key="workout.id"
            :workout="workout"
            
            @editWorkout="toggleEditWorkout"
            @deleteWorkout="toggleDeleteWorkout"
            @deleteStats="toggleDeleteStats"
          />
        </template>
       
      </draggable>

      <!-- Add Workout Button -->
      <div class="flex justify-center mt-6">
        <button @click="toggleAddWorkout" class="flex items-center justify-center border border-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition">
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

  const upDrag = () => {
    updateWorkoutOrder()
  };
</script>
  
<style>
/* Add any styles here */
</style>
  