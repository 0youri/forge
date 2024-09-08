<template>
    <div class="bg-gray-800 p-4 sm:p-6 rounded-md mb-4">
        <div @click.stop="toggleEditExercise">
            <div class="flex flex-row justify-between sm:items-center">
                <h2 class="text-sm sm:text-lg font-light text-gray-400">#{{ exercise.attributes.rank }} {{ exercise.attributes.muscle }}</h2>
                <p class="text-sm sm:text-base text-gray-400">{{ exercise.attributes.sets }} sets, {{ exercise.attributes.reps }} reps</p>
            </div>
            <div class="flex flex-row justify-between sm:items-center">
                <h3 class="text-md sm:text-lg font-bold text-gray-300">{{ exercise.attributes.name }}</h3>
                <p class="text-sm sm:text-base text-gray-400">{{ exercise.attributes.weight }}kg, {{ exercise.attributes.rest }}min rest</p>
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
            type: Number,
            default: 0,
        },
        exercise: {
            type: Object,
            default: {},
        },
        toggleOptions: {
            type: Object,
            default: {},
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