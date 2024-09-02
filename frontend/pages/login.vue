<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-yellow-500 via-black-90">
    <div class="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg">
      <h1 class="text-3xl font-semibold text-yellow-500 text-center mb-6">Login</h1>
      <form @submit.prevent="connect(username, password)" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-yellow-500">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Enter your username"
            class="mt-2 block w-full px-4 py-2 bg-gray-800 text-yellow-500 border border-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-yellow-500">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
            class="mt-2 block w-full px-4 py-2 bg-gray-800 text-yellow-500 border border-gray-700 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
      <div v-if="errorMessage" class="mt-4 text-red-500 text-sm text-center">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useUserStore } from '~/store/user'
  import { storeToRefs } from 'pinia'

  definePageMeta({
    layout: 'auth'
  })
  const userStore = useUserStore()
  const { connect } = userStore
  const { user, errorMessage } = storeToRefs(userStore)


  const username = ref('');
  const password = ref('');
</script>
