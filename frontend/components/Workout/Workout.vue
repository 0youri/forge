<template>
    <div
        @click="toggleSection()"
        class="bg-gray-700 rounded-lg p-3 mb-5 sm:p-5 cursor-pointer "
        :class="orderWorkout ? 'border-2 border-yellow-500' : ''"
    >
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
                    <span v-if="workout.type" class="text-sm font-light text-gray-300">{{ workout.type }}</span>
                </div>
            </div>
                
            <div class="flex items-center space-x-2.5 sm:space-x-4 sm:mt-0">
                <!-- Edit Button -->
                <NuxtLink
                    :to="!exercises[workout.documentId]?.length ? null : `/${workout.documentId}/start/1`"
                    class="flex text-sm items-center p-2 sm:px-4 sm:py-2 rounded-md border border-gray-500  hover:bg-gray-500 transition"
                    :class="!exercises[workout.documentId]?.length ? ' bg-gray-500 text-gray-300 cursor-not-allowed' : 'text-white'"
                >
                    Start workout
                </NuxtLink>
                <!-- Stats Icon with Dropdown -->
                <div ref="menuRef" class="relative" >
                    <button @blur="toggleWorkoutMenu" @click.stop="toggleWorkoutMenu()" class="p-2 bg-gray-700 rounded-full hover:bg-yellow-500 transition group">
                        <svg class="h-5 w-5 text-yellow-500 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                    </button>
                    <div v-if="toggleOptions.workoutMenu" class="absolute right-0 mt-2 w-48 bg-white text-black rounded-md z-20">
                        <button
                            @click.stop="
                                toggleWorkoutMenu(),
                                $emit('editWorkout',{workoutId: workout.documentId, name: workout.name, type: workout.type})
                            "
                            class="block px-4 py-2 text-sm rounded-t-md hover:bg-gray-100 flex items-center w-full"
                        >
                            Edit
                            <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 13V16h3l8.5-8.5-3-3L4 13z" />
                            </svg>
                        </button>
                        <button
                            @click.stop="
                                toggleWorkoutMenu(),
                                $emit('deleteWorkout',{workoutId: workout.documentId, name: workout.name, rank: workout.rank})
                            "
                            class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center w-full"
                        >
                            Delete
                            <svg class="ml-auto h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>
                        <NuxtLink
                            :to="`/${workout.documentId}/stats`"
                            class="block px-4 py-2 text-sm hover:bg-gray-100 flex items-center w-full"
                            target="_blank"
                        >
                            Look stats
                            <svg xmlns="http://www.w3.org/2000/svg" class="ml-auto h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3v18h18M9 9h12M9 15h12M9 21h12" />
                            </svg>
                        </NuxtLink>
                        <button
                            @click.stop="
                                toggleWorkoutMenu(),
                                $emit('deleteStats', {workoutId: workout.documentId, name: workout.name, rank: workout.rank})
                            "
                            class="block px-4 py-2 text-sm text-red-600 rounded-b-md hover:bg-gray-100 flex items-center w-full" 
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
            <div @click.stop="" v-if="toggleOptions.open" class="mt-4 border-t border-gray-600">
                <draggable 
                    v-if="exercises[workout.documentId]?.length"
                    v-model="exercises[workout.documentId]" 
                    @end="upDrag"
                    item-key="id"
                    class="pt-5"
                    :disabled="!toggleOptions.orderExercise"
                >
                    <template
                    #item="{ element: exercise }"
                    class=" mb-1"
                    >
                        <Exercise
                            :key="exercise.id"
                            :exercise="exercise"
                            :workoutId="workout.documentId"
                            :orderExercise="toggleOptions.orderExercise"
                        />
                    </template>
                </draggable>
                <div v-else>
                    <p class="text-center italic pt-5">No exercises found</p>
                </div>
                <div class="flex justify-center md:justify-end mt-6 space-x-4">
                    <button
                        v-if="exercises[workout.documentId]?.length > 1"
                        @click="toggleOrderExercise"
                        class="flex items-center justify-center text-sm sm:text-base border border-gray-500 text-white px-4 sm:px-6 py-3 rounded-md  transition"
                        :class="toggleOptions.orderExercise ? 'bg-yellow-600 hover:bg-yellow-500' : 'hover:bg-gray-800'"
                    >
                        <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>
                        {{ toggleOptions.orderExercise ? 'Stop reorder' : 'Reorder'}}
                    </button>
                    <button
                        @click="toggleAddExercise"
                        class="flex items-center justify-center text-sm sm:text-base whitespace-nowrap border border-gray-500 text-white px-3 sm:px-6 py-3 rounded-md hover:bg-gray-800 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a1 1 0 01-1-1V11H3a1 1 0 110-2h6V3a1 1 0 112 0v6h6a1 1 0 110 2h-6v6a1 1 0 01-1 1z" clip-rule="evenodd" />
                        </svg>
                        Add Exercise
                    </button>
                </div>
        </div>
        </transition>

        <ExerciseFormAdd
            @click.stop=""
            v-if="toggleOptions.addExercise"
            :workoutId="workout.documentId"

            @dismiss="toggleAddExercise"
        />
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
        orderWorkout: {
            type: Boolean,
            default: false,
        },
    })
    const exerciseStore = useExerciseStore()
    const { getExercises, updatExerciseOrder } = exerciseStore
    const { exercises } = storeToRefs(exerciseStore)

    onMounted(() => {
        getExercises(props.workout.documentId)

        document.addEventListener('click', closeMenu);
    })
    onUnmounted(() => {
        document.removeEventListener('click', closeMenu);
    });
    
    const toggleOptions = ref({
        open: false,
        workoutMenu: false,
        addExercise: false,
        orderExercise: false,
    })
    const menuRef = ref(null);

    const toggleSection = () => {
        toggleOptions.value.open = !toggleOptions.value.open
    }  
    const toggleWorkoutMenu = () => {
        toggleOptions.value.workoutMenu = !toggleOptions.value.workoutMenu
    }
    const closeMenu = (event: { target: any }) => {
        if (menuRef.value && !menuRef.value.contains(event.target)) {
            toggleOptions.value.workoutMenu = false;
        }
    };
    const toggleAddExercise = () => {
        toggleOptions.value.addExercise = !toggleOptions.value.addExercise
    }

    const toggleOrderExercise = () => {
        toggleOptions.value.orderExercise = !toggleOptions.value.orderExercise
    }

    const upDrag = () => {
        updatExerciseOrder(props.workout.documentId)
    }
</script>

<style>

</style>