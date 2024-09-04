<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Add Exercise</h2>
      <!-- Form Inputs -->
      <form @submit.prevent="add">
            <div class="grid grid-cols-2 gap-6">
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Muscle Group</label>
                <input v-model="muscle" placeholder='Chest' class="w-full p-2 border rounded text-black" />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Exercise Name</label>
                <input v-model="name" placeholder='Dumbbell Press' class="w-full p-2 border rounded text-black" />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Sets</label>
                <input v-model="sets" type="number" placeholder='3' class="w-full p-2 border rounded text-black" />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Reps</label>
                <input v-model="reps" placeholder='10' class="w-full p-2 border rounded text-black" />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Weight (kg)</label>
                <input v-model="weight" placeholder='30' type="number" class="w-full p-2 border rounded text-black" />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Rest (min)</label>
                <input v-model="rest" placeholder='3' type="number" class="w-full p-2 border rounded text-black" />
            </div>
            </div>

            <div class="flex justify-end space-x-2 mt-4">
                <button type="button" @click="$emit('dismiss')" class="bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
                <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md">Add</button>
            </div>
        </form>
    </div>
  </div>
</template>

<script setup>
import { useExerciseStore } from '~/store/exercise'
import { storeToRefs } from 'pinia'  

const props = defineProps({
    workoutId: {
        type: Number,
        default: 0
    },
})

const emit = defineEmits(['dismiss']);

const exerciseStore = useExerciseStore()
const { addExercise } = exerciseStore
const { exercises } = storeToRefs(exerciseStore)


const muscle = ref('');
const name = ref('');
const sets = ref('');
const reps = ref('')
const weight = ref('')
const rest = ref('')
const rank = computed(() => exercises.value[props.workoutId].length+1)

const add = () => {
  addExercise(
    muscle.value,
    name.value,
    sets.value,
    reps.value,
    weight.value,
    rest.value,
    rank.value,
    props.workoutId
  )
  emit('dismiss')
};
</script>