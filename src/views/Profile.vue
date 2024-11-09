<!-- src/views/Profile.vue -->
<template>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-6 text-center">Your Profile</h1>

    <!-- Display Profile Info -->
    <div class="bg-white shadow-md rounded-lg p-6">
      <!-- Display User Details -->
      <div class="space-y-6">
        <!-- Display Name -->
        <div class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">Display Name</label>
          <p class="text-lg font-semibold text-gray-900">
            {{ user?.signInDetails?.loginId?.split("@")[0] || "Not Available" }}
          </p>
        </div>

        <!-- Email -->
        <div v-if="user?.signInDetails" class="space-y-1">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="text-lg font-semibold text-gray-900">
            {{ user?.signInDetails?.loginId || "Not Available" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ user: { signInDetails?: { loginId?: string; email?: string } } }>();
</script>
