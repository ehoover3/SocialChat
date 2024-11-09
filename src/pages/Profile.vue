<!-- src/components/Profile.vue -->
<template>
  <main>
    <h2 class="text-3xl font-bold text-center mb-6">Profile</h2>
    <p class="mb-4"><strong>UserID:</strong> {{ user.username }}</p>
    <p class="mb-4"><strong>Email:</strong> {{ user?.signInDetails?.loginId }}</p>
  </main>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: {
    username: string;
    email: string;
    signInDetails: {
      loginId: string;
    };
  };
}>();

function saveProfile() {
  console.log("Profile saved:", props.user);
}
</script>
