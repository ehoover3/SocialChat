export default defineNuxtConfig({
  devtools: { enabled: true },
});
// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   app: {
//     head: {
//       link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico?v2" }],
//       pageTransition: true,
//     },
//   },
//   nitro: {
//     awsAmplify: {
//       // catchAllStaticFallback: true,
//       // imageOptimization: { "/_image", cacheControl: "public, max-age=3600, immutable" },
//       // imageSettings: { ... },
//     },
//   },
//   buildModules: ["@nuxtjs/tailwindcss"],
//   modules: ["@nuxtjs/tailwindcss"],
//   serverMiddleware: [],
//   build: {
//     transpile: ["@heroicons/vue"],
//   },

//   runtimeConfig: {
//     public: {
//       cloudinaryCloudName: process.env.SOCIAL_MEDIA_CLOUDINARY_CLOUD_NAME,
//       cloudinaryApiKey: process.env.SOCIAL_MEDIA_CLOUDINARY_API_KEY,
//     },
//     jwtAccessSecret: process.env.SOCIAL_MEDIA_JWT_ACCESS_TOKEN_SECRET,
//     jwtRefreshSecret: process.env.SOCIAL_MEDIA_JWT_REFRESH_TOKEN_SECRET,
//     cloudinaryApiSecret: process.env.SOCIAL_MEDIA_CLOUDINARY_API_SECRET,
//   },

//   compatibilityDate: "2024-10-16",
// });
