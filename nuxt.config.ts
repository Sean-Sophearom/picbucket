// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "nuxt-mongoose",
    "@nuxt/eslint"
  ],
  auth: { provider: { type: "authjs" } },
});
