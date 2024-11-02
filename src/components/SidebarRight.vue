<!-- src/components/SidebarRight.vue -->
<template>
  <div class="w-full p-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-md min-h-screen">
    <h2 class="text-xl font-bold mb-4">Profile</h2>
    <a href="https://erichoover.org/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center flex-col p-4 transition-transform transform hover:scale-105">
      <img class="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md" :src="profileImage" alt="Profile" />
      <p class="mt-2 text-sm font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">See My Full Portfolio</p>
    </a>

    <footer class="mt-6">
      <ul class="flex flex-wrap justify-center mx-2 text-xs text-gray-600 dark:text-gray-400">
        <li class="mx-2">
          <a href="/privacypolicy" class="hover:underline">Privacy Policy</a>
        </li>
        <li class="mx-2">
          <a href="/cookiepolicy" class="hover:underline">Cookie Policy</a>
        </li>
        <li class="mx-2">
          <a href="/accessibilitypolicy" class="hover:underline">Accessibility</a>
        </li>
        <li class="mx-2">© 2024 Social App</li>
      </ul>
    </footer>
  </div>
</template>

<script setup>
import profileImage from "@/assets/images/profile.png";
</script>
