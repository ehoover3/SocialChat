// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: { head: { link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico?v2" }] } },

  buildModules: ["@nuxtjs/tailwindcss"],
  modules: ["@nuxtjs/tailwindcss"],
  serverMiddleware: [],
  build: {
    transpile: ["@heroicons/vue"],
  },

  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET,

    // Cloudinary
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },

  compatibilityDate: "2024-10-16",
});
