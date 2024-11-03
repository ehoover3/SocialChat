<!-- src/App.vue -->
<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      <Authenticator>
        <template v-slot="{ user, signOut }">
          <div class="flex-grow flex">
            <aside class="hidden md:block w-64 sticky top-0 h-screen shadow-lg">
              <SidebarLeft v-if="user" :user="user || {}" @signOut="signOut" @tabSelected="setSelectedTab" />
            </aside>

            <main class="flex-grow flex flex-col p-4 md:p-6">
              <Main v-if="user" :user="user || {}" :selectedTab="selectedTab" />
            </main>

            <aside class="hidden md:block w-64 sticky top-0 h-screen shadow-lg">
              <SidebarRight :darkMode="darkMode" @toggleDarkMode="toggleDarkMode" />
            </aside>

            <section class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gray-800 text-white text-center">
              <button class="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600 transition">Post Message</button>
            </section>
          </div>
        </template>
      </Authenticator>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import SidebarLeft from "./components/SidebarLeft.vue";
import SidebarRight from "./components/SidebarRight.vue";
import Main from "./components/Main.vue";
import "@aws-amplify/ui-vue/styles.css";
import "./assets/tailwind.css";

const darkMode = ref(true);
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
};
const selectedTab = ref("home");
const setSelectedTab = (tab: string) => {
  selectedTab.value = tab;
};
</script>
