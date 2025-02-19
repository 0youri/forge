<template>
    <div class="w-full mt-2 p-4 bg-gray-700 rounded-lg">
        <form @submit.prevent="edit">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300 mb-1">Muscle Group</label>
                <input
                    v-model="form.muscle.value"
                    class="w-full p-2 border rounded text-black outline outline-offset-0 outline-2"
                    :class="form.muscle.error ? form.muscle.error : 'outline-yellow-500'"

                />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300 mb-1">Exercise Name</label>
                <input
                    v-model="form.name.value"
                    class="w-full p-2 border rounded text-black outline outline-offset-0 outline-2"
                    :class="form.name.error ? form.name.error : 'outline-yellow-500'"
                />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300 mb-1">Sets</label>
                <input
                    v-model="form.sets.value" type="number" min='0'
                    class="w-full p-2 border rounded text-black outline outline-offset-0 outline-2"
                    :class="form.sets.error ? form.sets.error : 'outline-yellow-500'"
                />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300 mb-1">Reps</label>
                <input
                    v-model="form.reps.value" 
                    class="w-full p-2 border rounded text-black outline outline-offset-0 outline-2"
                    :class="form.reps.error ? form.reps.error : 'outline-yellow-500'"
                />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300 mb-1">Weight (kg)</label>
                <input
                    v-model="form.weight.value" type="number" min='0' step="any"
                    class="w-full p-2 border rounded text-black outline outline-offset-0 outline-2"
                    :class="form.weight.error ? form.weight.error : 'outline-yellow-500'"
                />
            </div>
            
            <div class="flex flex-col">
                <label class="block text-sm text-gray-300 mb-1">Rest (min)</label>
                <input
                    v-model="form.rest.value" type="number" min='0'
                    class="w-full p-2 border rounded text-black outline outline-offset-0 outline-2"
                    :class="form.rest.error ? form.rest.error : 'outline-yellow-500'"
                />
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
        <div v-if="errorMessage" class="flex text-red-500 text-sm items-center gap-1 mt-5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
            </svg>

            {{ errorMessage }}
        </div>
    </div>
</template>

<script lang="ts" setup>

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

    const form = reactive({
        muscle: { value: props.exercise.muscle, error: '' },
        name: { value: props.exercise.name, error: '' },
        sets: { value: props.exercise.sets, error: '' },
        reps: { value: props.exercise.reps, error: '' },
        weight: { value: props.exercise.weight, error: '' },
        rest: { value: props.exercise.rest, error: '' }
    })
    const errorMessage = ref('')

    const emit = defineEmits(['dismiss', 'deleteExercise']);

    const exerciseStore = useExerciseStore()
    const { editExercise } = exerciseStore

    const edit = () => {
        if (validateExerciseFields(form, errorMessage)) {
            editExercise(
                props.workoutId,
                props.exercise.documentId,
                form.muscle.value,
                form.name.value,
                form.sets.value,
                form.reps.value,
                form.weight.value,
                form.rest.value
            )
            emit('dismiss')
        }
    }
</script>

<style>

</style>