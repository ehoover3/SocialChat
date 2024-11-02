<!-- src/components/SidebarRight.vue -->
<template>
  <div class="w-full p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-md min-h-screen">
    <h2 class="text-xl font-bold mb-4">Profile</h2>
    <a href="https://erichoover.org/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center flex-col p-4 transition-transform transform hover:scale-105">
      <img class="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md" :src="profileImage" alt="Profile" />
      <p class="mt-2 text-sm font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">See My Full Portfolio</p>
    </a>

    <section class="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
      <ul class="flex flex-col space-y-2 items-center">
        <li class="cursor-pointer" @click="toggleMode">
          <span class="hover:underline transition-colors duration-200">{{ darkMode ? "Light Mode" : "Dark Mode" }}</span>
        </li>

        <li>
          <a href="/privacypolicy" class="hover:underline transition-colors duration-200">Privacy</a>
        </li>
        <li>
          <a href="/cookiepolicy" class="hover:underline transition-colors duration-200">Cookie</a>
        </li>
        <li>
          <a href="/accessibilitypolicy" class="hover:underline transition-colors duration-200">Accessibility</a>
        </li>
        <li class="text-xs text-gray-500 dark:text-gray-400 text-center">© 2024 Social App</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import profileImage from "@/assets/images/profile.png";
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  darkMode: Boolean,
});
const emit = defineEmits();

const toggleMode = () => {
  emit("toggleDarkMode");
};
</script>
