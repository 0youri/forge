<template>
    <div @click="toggleSection()" class="bg-gray-800 rounded-lg p-3 mb-5 sm:p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        <div class="flex justify-between items-center flex-row">
            <div class="flex items-center space-x-4">
                <!-- Plus Icon -->
                <div class="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-45': toggleOptions.open }"
                        class="h-3 w-3 sm:h-5 sm:w-5 transform transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a1 1 0 01-1-1V11H3a1 1 0 110-2h6V3a1 1 0 112 0v6h6a1 1 0 110 2h-6v6a1 1 0 01-1 1z" clip-rule="evenodd" />
                    </svg>
                </div>
                <!-- Workout Title -->
                <div class="leading-none">
                    <h2 class="text-sm sm:text-xl font-bold text-white">#{{ workout.rank }} {{ workout.name }}</h2>
                    <span class="text-sm font-light text-gray-300">{{ workout.type }}</span>
                </div>
            </div>
                
            <div class="flex items-center space-x-2.5 sm:space-x-4 sm:mt-0">

                <!-- Edit Button -->
                <button @click.stop="" class="flex text-sm items-center p-2 sm:px-4 sm:py-2 rounded-md border border-gray-500 text-white hover:bg-gray-700 transition">
                    <span>Start workout</span>
                </button>
                <!-- Stats Icon with Dropdown -->
                <div class="relative">
                    <button @click.stop="toggleWorkoutMenu()" class="p-2 bg-gray-700 rounded-full hover:bg-yellow-500 transition group">
                        <svg class="h-5 w-5 text-yellow-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </button>
                    <div v-if="toggleOptions.workoutMenu" class="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-20">
                        <button
                            @click.stop="toggleWorkoutMenu(), $emit('editWorkout',{id: workout.id, name: workout.name, type: workout.type})"
                            class="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center w-full"
                        >
                            Edit
                            <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 13V16h3l8.5-8.5-3-3L4 13z" />
                            </svg>
                        </button>
                        <button
                            @click.stop="$emit('deleteWorkout')"
                            class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center w-full"
                        >
                            Delete
                            <svg class="ml-auto h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                        <button
                            @click.stop="$emit('lookStats')"
                            class="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center w-full"
                        >
                            Look stats
                            <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18M9 9h12M9 15h12M9 21h12" />
                            </svg>
                        </button>

                        <button
                            @click.stop="$emit('deleteAllStats')"
                            class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center w-full" 
                        >
                            Delete All Stats
                            <svg class="ml-auto h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Exercises Section -->
        <transition @click.stop="" name="fade">
            <div @click.stop="" v-if="toggleOptions.open" class="mt-4">
                <draggable 
                    v-model="exercises[workout.id]" 
                    @end="upDrag"
                    item-key="id"
                    @dragstart.stop
                    @dragend.stop
                >
                    <template
                    #item="{ element: exercise }"
                    class="mb-1"
                    >
                        <Exercise
                            :key="exercise.id"
                            :exercise="exercise"
                            :workoutId="workout.id"
                        />
                    </template>
                </draggable>
                <div class="flex justify-center space-x-4 mt-4">
                    <button @click.stop="" class="flex items-center p-1 sm:px-4 sm:py-2 rounded-md border border-gray-500 text-white hover:bg-gray-700 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a1 1 0 01-1-1V11H3a1 1 0 110-2h6V3a1 1 0 112 0v6h6a1 1 0 110 2h-6v6a1 1 0 01-1 1z" clip-rule="evenodd" />
                        </svg>
                        <span class="hidden sm:inline">Add Exercise</span>
                    </button>
                    <button @click.stop="" class="flex items-center p-1 sm:px-4 sm:py-2 rounded-md border border-gray-500 text-white hover:bg-gray-700 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 13V16h3l8.5-8.5-3-3L4 13z" />
                        </svg>
                        <span class="hidden sm:inline">Edit Exercise</span>
                    </button>
                    <button @click.stop="" class="flex items-center p-1 sm:px-4 sm:py-2 rounded-md border border-gray-500 text-white hover:bg-gray-700 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M6 8a1 1 0 011-1h6a1 1 0 011 1v7a2 2 0 01-2 2H8a2 2 0 01-2-2V8zm3-3a1 1 0 112 0v1H9V5zM4 7v10a4 4 0 004 4h4a4 4 0 004-4V7a2 2 0 00-2-2H6a2 2 0 00-2 2z" clip-rule="evenodd" />
                        </svg>
                        <span class="hidden sm:inline">Delete Exercise</span>
                    </button>
                </div>
        </div>
        </transition>
    </div>
</template>

<script lang="ts" setup>
    import { useExerciseStore } from '~/store/exercise'
    import draggable from 'vuedraggable'

    const props = defineProps({
        workout: {
            type: Object,
            default: {},
        },
    })
    const exerciseStore = useExerciseStore()
    const { getExercises, updatExerciseOrder } = exerciseStore
    const { exercises } = storeToRefs(exerciseStore)

    onMounted(() => {
        getExercises(props.workout.id)
    })
    
    const toggleOptions = ref({
        open: false,
        workoutMenu: false,
    });

    const toggleSection = () => {
        toggleOptions.value.open = !toggleOptions.value.open;
    };  
    const toggleWorkoutMenu = () => {
        toggleOptions.value.workoutMenu = !toggleOptions.value.workoutMenu;
    };

    const upDrag = () => {
        updatExerciseOrder(props.workout.id)
    }
</script>

<style>

</style>