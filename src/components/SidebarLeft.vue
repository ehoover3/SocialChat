<!-- src/components/SidebarLeft.vue -->
<template>
  <aside class="w-full p-5 bg-gray-100 dark:bg-gray-800 min-h-screen text-gray-800 dark:text-gray-100 shadow-lg">
    <h2 class="text-xl font-bold mb-4">Menu</h2>
    <ul class="space-y-2">
      <li><a href="#" class="block p-2 hover:bg-pink-300 dark:hover:bg-pink-700 transition rounded">Home</a></li>
      <li><a href="#" class="block p-2 hover:bg-pink-300 dark:hover:bg-pink-700 transition rounded">Profile</a></li>
      <li><a href="#" class="block p-2 hover:bg-pink-300 dark:hover:bg-pink-700 transition rounded">Settings</a></li>
    </ul>
    <button @click="handleSignOut" class="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-400 transition">Sign Out</button>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ user: Record<string, any> }>();
const emit = defineEmits();

const handleSignOut = () => {
  emit("signOut");
};
</script>
