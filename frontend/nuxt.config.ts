// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/strapi",
    "@pinia/nuxt",
    '@nuxtjs/tailwindcss',
  ],
  strapi: {
    url: 'http://localhost:1337',
  },
})