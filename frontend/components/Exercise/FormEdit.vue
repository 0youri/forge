<template>
    <div class="w-full mt-2 p-4 bg-gray-700 rounded-lg">
        <form @submit.prevent="edit">
            <div class="grid grid-cols-2 gap-6">
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Muscle Group</label>
                <input v-model="newMuscle" class="w-full p-2 border rounded text-black" />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Exercise Name</label>
                <input v-model="newName" class="w-full p-2 border rounded text-black" />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Sets</label>
                <input v-model="newSets" type="number" class="w-full p-2 border rounded text-black" />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Reps</label>
                <input v-model="newReps"        class="w-full p-2 border rounded text-black" />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Weight (kg)</label>
                <input v-model="newWeight" type="number" class="w-full p-2 border rounded text-black" />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300">Rest (min)</label>
                <input v-model="newRest" type="number" class="w-full p-2 border rounded text-black" />
            </div>
            </div>

            <div class="flex justify-between space-x-2 mt-4">
                <div>
                    <button type="button" @click="$emit('deleteExercise')" class="bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
                </div>
                <div class="space-x-2">
                    <button type="button" @click="$emit('dismiss')" class="bg-gray-600 text-white px-4 py-2 rounded-md">Cancel</button>
                    <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md">Save</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>

    import { useExerciseStore } from '~/store/exercise'

    const props = defineProps({
        workoutId: {
            type: Number,
            default: 0
        },
        exercise: {
            type: Object,
            default: {},
        },
    })
    const newMuscle = ref(props.exercise.attributes.muscle);
    const newName = ref(props.exercise.attributes.name);
    const newSets = ref(props.exercise.attributes.sets);
    const newReps = ref(props.exercise.attributes.reps);
    const newWeight = ref(props.exercise.attributes.weight);
    const newRest = ref(props.exercise.attributes.rest);

    const emit = defineEmits(['dismiss', 'deleteExercise']);

    const exerciseStore = useExerciseStore()
    const { editExercise } = exerciseStore

    const edit = () => {
        editExercise(
            props.workoutId,
            props.exercise.id,
            newMuscle.value,
            newName.value,
            newSets.value,
            newReps.value,
            newWeight.value,
            newRest.value
        )
        emit('dismiss')
    };
</script>

<style>

</style>