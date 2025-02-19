<template>
  <header class="bg-gray-800 border-b text-white">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-xl font-bold text-yellow-500">
        <nuxt-link to="/">{ Forge }</nuxt-link>
      </div>

      <!-- Desktop Navigation -->
      <nav class="md:flex space-x-8 items-center">
        <!-- <nuxt-link to="/" class="hover:text-yellow-500">Home</nuxt-link>
        <nuxt-link to="/about" class="hover:text-yellow-500">About</nuxt-link>
        <nuxt-link to="/services" class="hover:text-yellow-500">Services</nuxt-link>
        <nuxt-link to="/contact" class="hover:text-yellow-500">Contact</nuxt-link> -->
        <div class="flex items-center space-x-4 ml-4">
          <span class="text-sm text-gray-400">Hello, {{ username }}</span>
          <button @click="disconnect" class="bg-yellow-500 text-black px-4 py-2 rounded-md">Logout</button>
        </div>
      </nav>

      <!-- Mobile Menu Button -->
      <!-- <button @click="toggleMenu" class="md:hidden flex items-center focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button> -->
    </div>

    <!-- Mobile Navigation -->
 
  </header>
</template>

<script setup>
  import { useUserStore } from '~/store/user'
  import { storeToRefs } from 'pinia'

  const userStore = useUserStore()
  const { disconnect } = userStore
  const { user } = storeToRefs(userStore)
  const username = ref(user.value.username)

  const menuOpen = ref(false);

  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  }

</script>


<style>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
