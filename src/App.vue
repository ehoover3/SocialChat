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
              <Main v-if="user" :user="user" :selectedTab="selectedTab" />
            </main>

            <aside class="hidden md:block w-64 sticky top-0 h-screen shadow-lg">
              <SidebarRight :darkMode="darkMode" @toggleDarkMode="toggleDarkMode" />
            </aside>

            <section class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gray-800 text-white text-center shadow-lg rounded-t-lg">
              <div class="flex justify-around">
                <button @click="selectTab('home')" class="bg-blue-500 px-4 py-3 rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                  <HomeIcon class="h-6 w-6" />
                </button>
                <button @click="selectTab('profile')" class="bg-blue-500 px-4 py-3 rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                  <UserIcon class="h-6 w-6" />
                </button>
                <button @click="selectTab('privacyPolicy')" class="bg-blue-500 px-4 py-3 rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                  <IdentificationIcon class="h-6 w-6" />
                </button>
                <button @click="selectTab('cookiePolicy')" class="bg-blue-500 px-4 py-3 rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                  <FingerPrintIcon class="h-6 w-6" />
                </button>
                <button @click="selectTab('termsOfService')" class="bg-blue-500 px-4 py-3 rounded-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
                  <ClipboardIcon class="h-6 w-6" />
                </button>
              </div>
            </section>
          </div>
        </template>
      </Authenticator>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, UserIcon, IdentificationIcon, FingerPrintIcon, ClipboardIcon } from "@heroicons/vue/solid";
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
const emit = defineEmits();

const setSelectedTab = (tab: string) => {
  selectedTab.value = tab;
};

const selectTab = (tab: string) => {
  setSelectedTab(tab); // Update the selected tab
  emit("tabSelected", tab); // Emit the event if necessary
};
</script>
