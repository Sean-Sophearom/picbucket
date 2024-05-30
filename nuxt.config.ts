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
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@formkit/auto-animate",
    "nuxt-api-shield",
  ],
  nuxtApiShield: {
    limit: {
      max: 21,
      duration: 30,
      ban: 2 * 60,
    },
    delayOnBan: false,
  },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
  auth: { provider: { type: "authjs" } },
  shadcn: {
    prefix: "Ui",
    componentDir: "./components/Ui",
  },
  components: [
    {
      path: "~/components",
      pathPrefix: true,
    },
  ],
  imports: {
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
    ],
  },
  nitro: {
    storage: {
      shield: {
        driver: "memory",
      },
    },
  },
});
