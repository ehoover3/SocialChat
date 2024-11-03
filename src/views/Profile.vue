<!-- src/components/Profile.vue -->
<template>
  <main class="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md text-gray-800 dark:text-white">
    <h2 class="text-2xl font-bold">Profile</h2>
    <div>
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <!-- Add other user details here -->
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{ user: Record<string, any> }>();
</script>
