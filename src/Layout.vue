<template>
  <div class="flex flex-col items-center">
    <div class="flex-grow flex">
      <aside class="hidden md:block w-64 sticky top-0 h-screen shadow-lg">
        <SidebarLeft :user="user" @signOut="signOut" @tabSelected="setSelectedTab" />
      </aside>

      <main class="flex-grow flex flex-col p-4 md:p-6">
        <Main :user="user" :selectedTab="selectedTab" />
      </main>

      <aside class="hidden md:block w-64 sticky top-0 h-screen shadow-lg">
        <SidebarRight :darkMode="darkMode" @toggleDarkMode="toggleDarkMode" />
      </aside>

      <section class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gray-800 text-white text-center shadow-lg rounded-t-lg">
        <div class="flex justify-around">
          <button @click="selectTab('home')" class="tab-button">
            <HomeIcon class="h-6 w-6" />
          </button>
          <button @click="selectTab('profile')" class="tab-button">
            <UserIcon class="h-6 w-6" />
          </button>
          <button @click="selectTab('privacyPolicy')" class="tab-button">
            <IdentificationIcon class="h-6 w-6" />
          </button>
          <button @click="selectTab('cookiePolicy')" class="tab-button">
            <FingerPrintIcon class="h-6 w-6" />
          </button>
          <button @click="selectTab('termsOfService')" class="tab-button">
            <ClipboardIcon class="h-6 w-6" />
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, UserIcon, IdentificationIcon, FingerPrintIcon, ClipboardIcon } from "@heroicons/vue/solid";
import SidebarLeft from "./SidebarLeft.vue";
import SidebarRight from "./SidebarRight.vue";
import Main from "./Main.vue";

const props = defineProps({
  user: Object,
  signOut: Function,
  darkMode: Boolean,
  selectedTab: String,
  setSelectedTab: Function,
  toggleDarkMode: Function,
});
</script>

<style scoped>
.tab-button {
  background: #3b82f6; /* Tailwind Blue */
  padding: 0.75rem;
  border-radius: 9999px;
  transition: background 0.2s;
}

.tab-button:hover {
  background: #2563eb; /* Darker Blue */
}
</style>
