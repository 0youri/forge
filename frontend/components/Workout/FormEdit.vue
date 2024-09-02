<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Edit Workout</h2>
        <!-- Form Inputs -->
        <form @submit.prevent="edit">
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
          <div class="flex justify-end space-x-2">
            <button type="button" @click="$emit('dismiss')" class="bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md">Save</button>
          </div>
        </form>
      </div>
    </div>
</template>
  
<script setup>  
  import { useWorkoutStore } from '~/store/workout'
  import { storeToRefs } from 'pinia'  

  const props = defineProps({
    workout: {
        type: Object,
        default: {},
    },
  })
  const emit = defineEmits(['dismiss']);

  const workoutStore = useWorkoutStore()
  const { editWorkout } = workoutStore
  const { workouts } = storeToRefs(workoutStore)


  const name = ref(props.workout.name)
  const type = ref(props.workout.type)

  const edit = () => {
    editWorkout(props.workout.id, name.value, type.value)
    emit('dismiss')
  };
</script>