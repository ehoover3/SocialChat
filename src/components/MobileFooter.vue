<!-- src/components/MobileFooter.vue -->
<template>
  <section class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gray-800 text-white text-center shadow-lg rounded-t-lg">
    <div class="flex justify-around">
      <button @click="selectTab('home')" class="bg-blue-500 px-4 py-3 rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
        <HomeIcon class="h-6 w-6" />
      </button>
      <button @click="selectTab('profile')" class="bg-blue-500 px-4 py-3 rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
        <UserIcon class="h-6 w-6" />
      </button>
      <button @click="selectTab('privacyPolicy')" class="bg-blue-500 px-4 py-3 rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
        <IdentificationIcon class="h-6 w-6" />
      </button>
      <button @click="selectTab('cookiePolicy')" class="bg-blue-500 px-4 py-3 rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
        <FingerPrintIcon class="h-6 w-6" />
      </button>
      <button @click="selectTab('termsOfService')" class="bg-blue-500 px-4 py-3 rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
        <ClipboardIcon class="h-6 w-6" />
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { HomeIcon, UserIcon, IdentificationIcon, FingerPrintIcon, ClipboardIcon } from "@heroicons/vue/solid";

const props = defineProps({
  selectTab: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
