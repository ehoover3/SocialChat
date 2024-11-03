<!-- src/components/Main.vue -->
<template>
  <div class="flex-grow border-x border-gray-200 dark:border-gray-700">
    <Home v-if="selectedTab === 'home'" :user="user" />
    <Profile v-else-if="selectedTab === 'profile'" :user="user" />
    <PrivacyPolicy v-else-if="selectedTab === 'privacyPolicy'" :user="user" />
    <CookiePolicy v-else-if="selectedTab === 'cookiePolicy'" :user="user" />
    <TermsOfService v-else-if="selectedTab === 'termsOfService'" :user="user" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import PrivacyPolicy from "../views/PrivacyPolicy.vue";
import CookiePolicy from "../views/CookiePolicy.vue";
import TermsOfService from "../views/TermsOfService.vue";
import type { User } from "../types/User";

const props = defineProps<{
  user: User;
  selectedTab: string;
}>();
</script>
