<template>
  <div class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-2 flex justify-around shadow-lg z-10">
    <nuxt-link to="/" class="flex flex-col items-center text-center text-black dark:text-white">
      <HomeIcon class="w-6 h-6" />
      <span class="text-xs mt-1">Home</span>
    </nuxt-link>

    <nuxt-link to="/profile" class="flex flex-col items-center text-center text-black dark:text-white" :class="{ 'font-semibold': isActive('/profile') }">
      <UserIcon class="w-6 h-6" />
      <span class="text-xs mt-1">Profile</span>
    </nuxt-link>

    <button @click="handleLogout" class="flex flex-col items-center text-center text-black dark:text-white">
      <LogoutIcon class="w-6 h-6" />
      <span class="text-xs mt-1">Log Out</span>
    </button>
  </div>
</template>

<script setup>
import { HomeIcon, UserIcon } from "@heroicons/vue/solid";
import { LogoutIcon } from "@heroicons/vue/outline";
import { useRoute, useRouter } from "vue-router";

const { logout } = useAuth();
const route = useRoute();
const router = useRouter();

const isActive = (path) => {
  return path === route.path;
};

const handleLogout = async () => {
  try {
    await logout();
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>

<style scoped>
/* Customize styles if needed */
</style>
