<!-- src/components/Profile.vue -->
<template>
  <main class="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md text-gray-800 dark:text-white">
    <h2 class="text-3xl font-bold text-center mb-6">Profile</h2>
    <p class="mb-4"><strong>UserID:</strong> {{ user.username }}</p>
    <p class="mb-4"><strong>Email:</strong> {{ user?.signInDetails?.loginId }}</p>
  </main>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

// Correctly type the props
const props = defineProps<{
  user: {
    username: string;
    email: string;
    signInDetails: {
      loginId: string;
    };
  };
}>();

// Define the saveProfile method
function saveProfile() {
  console.log("Profile saved:", props.user);
  // Logic to save the profile goes here
}
</script>
