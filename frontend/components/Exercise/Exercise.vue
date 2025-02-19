<template>
    <div
        class="bg-gray-800 p-4 sm:p-6 rounded-md mb-4"
        :class="orderExercise ? 'border-2 border-yellow-500' : ''"
    >
        <div @click.stop="toggleEditExercise">
            <div class="flex flex-row justify-between sm:items-center">
                <h2 class="text-sm sm:text-lg font-light text-gray-400">#{{ exercise.rank }} {{ exercise.muscle }}</h2>
                <p class="text-sm sm:text-base text-gray-400">{{ exercise.sets }} sets, {{ exercise.reps }} reps</p>
            </div>
            <div class="flex flex-row justify-between sm:items-center">
                <h3 class="text-md sm:text-lg font-bold text-gray-300">{{ exercise.name }}</h3>
                <p class="text-sm sm:text-base text-gray-400">{{ exercise.weight }}kg, {{ exercise.rest }}min rest</p>
            </div>
        </div>
        <ExerciseFormEdit 
            v-if="toggleOptions.editExercise"
            :key="exercise.id"
            :workoutId="workoutId"
            :exercise="exercise"
            @dismiss="toggleEditExercise"
            @deleteExercise="toggleDeleteExercise"
        />

        <ExerciseFormDelete
            v-if="toggleOptions.deleteExercise"
            :key="exercise.id"
            :workoutId="workoutId"
            :exercise="exercise"
            @dismiss="toggleDeleteExercise"
        />
    </div>
</template>

<script lang="ts" setup>

    defineProps({
        workoutId: {
            type: String,
            default: '',
        },
        exercise: {
            type: Object,
            default: {},
        },
        toggleOptions: {
            type: Object,
            default: {},
        },
        orderExercise: {
            type: Boolean,
            default: false,
        },
    })

    const toggleOptions = ref({
        editExercise: false,
        deleteExercise: false,
    });

    const toggleEditExercise = () => {
        toggleOptions.value.editExercise = !toggleOptions.value.editExercise
    }
    const toggleDeleteExercise = () => {
        toggleOptions.value.deleteExercise = !toggleOptions.value.deleteExercise
    }

</script>

<style>

</style>