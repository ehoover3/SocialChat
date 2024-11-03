<!-- src/components/Profile.vue -->
<template>
  <main class="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md text-gray-800 dark:text-white">
    <h2 class="text-3xl font-bold text-center mb-6">Profile</h2>
    <p class="mb-4"><strong>Username:</strong> {{ user.username }}</p>
    <p class="mb-4"><strong>Email:</strong> {{ user?.signInDetails?.loginId }}</p>

    <div>
      <form @submit.prevent="saveProfile">
        <div class="mb-4">
          <label class="block font-semibold" for="username">Username:</label>
          <!-- <input id="username" v-model="user.username" type="text" class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-500" required /> -->
        </div>

        <div class="mb-4">
          <label class="block font-semibold" for="email">Email:</label>
          <!-- <input id="email" v-model="user.email" type="email" class="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-500" required /> -->
        </div>

        <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">Save Changes</button>
      </form>
    </div>
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
