<!-- src/components/Main.vue -->
<template>
  <main class="flex-grow flex flex-col p-4 md:p-6">
    <div class="flex-grow border-x border-gray-200 dark:border-gray-700">
      <Home v-if="selectedTab === 'home'" :user="user" />
      <Profile v-else-if="selectedTab === 'profile'" :user="user" />
      <PrivacyPolicy v-else-if="selectedTab === 'privacyPolicy'" :user="user" />
      <CookiePolicy v-else-if="selectedTab === 'cookiePolicy'" :user="user" />
      <TermsOfService v-else-if="selectedTab === 'termsOfService'" :user="user" />
    </div>
  </main>
</template>

<script setup lang="ts">
import Home from "../pages/Home.vue";
import Profile from "../pages/Profile.vue";
import PrivacyPolicy from "../pages/PrivacyPolicy.vue";
import CookiePolicy from "../pages/CookiePolicy.vue";
import TermsOfService from "../pages/TermsOfService.vue";
import type { User } from "../types/User";

const props = defineProps<{
  user: User;
  selectedTab: string;
}>();
</script>
