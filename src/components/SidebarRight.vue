<!-- src/components/SidebarRight.vue -->

<template>
  <div class="flex flex-col p-4 bg-white shadow-md rounded-lg">
    <a href="https://erichoover.org/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center flex-col p-4 transition-transform transform hover:scale-105">
      <img class="w-24 h-24 rounded-full border-2 border-blue-500 shadow-md" :src="profileImage" alt="Profile" />
      <p class="mt-2 text-sm font-bold text-blue-600 cursor-pointer hover:underline">See my full portfolio</p>
    </a>

    <footer class="mt-6">
      <ul class="flex flex-wrap justify-center mx-2 text-xs text-gray-600">
        <li class="mx-2">
          <a href="/privacypolicy" class="hover:underline">Privacy Policy</a>
        </li>
        <li class="mx-2">
          <a href="/cookiepolicy" class="hover:underline">Cookie Policy</a>
        </li>
        <li class="mx-2">
          <a href="/accessibilitypolicy" class="hover:underline">Accessibility</a>
        </li>
        <li class="mx-2">© 2024 Social Media App</li>
      </ul>
    </footer>
  </div>
</template>

<script setup>
import profileImage from "@/assets/images/profile.png";
</script>
