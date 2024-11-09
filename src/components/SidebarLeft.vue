<!-- src/components/SidebarLeft.vue -->

<template>
  <aside>
    <div class="flex flex-col items-center border border-gray-400 bg-gray-50 rounded-lg m-2 mt-4 p-2 pb-8">
      <div class="mt-2 space-y-3">
        <!-- Home Tab -->
        <router-link to="/">
          <button class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200" title="Home" @click="selectTab('home')">
            <HomeIcon class="w-6 h-6 text-dark" />
            <span class="ml-4 text-l hidden sm:block whitespace-nowrap">Home</span>
          </button>
        </router-link>

        <!-- Profile Tab -->
        <router-link to="/profile">
          <button class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200" title="Home" @click="selectTab('home')">
            <UserIcon class="w-6 h-6 text-dark" />
            <span class="ml-4 text-l hidden sm:block whitespace-nowrap">Profile</span>
          </button>
        </router-link>

        <!-- Privacy Policy Tab -->
        <router-link to="/privacypolicy">
          <button class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200" title="Home" @click="selectTab('home')">
            <IdentificationIcon class="w-6 h-6 text-dark" />
            <span class="ml-4 text-l hidden sm:block whitespace-nowrap">Privacy Policy</span>
          </button>
        </router-link>

        <!-- Cookie Policy Tab -->
        <router-link to="/cookiepolicy">
          <button class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200" title="Home" @click="selectTab('home')">
            <FingerPrintIcon class="w-6 h-6 text-dark" />
            <span class="ml-4 text-l hidden sm:block whitespace-nowrap">Cookie Policy</span>
          </button>
        </router-link>

        <!-- Terms of Service Tab -->
        <router-link to="/termsofservice">
          <button class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200" title="Home" @click="selectTab('home')">
            <ClipboardIcon class="w-6 h-6 text-dark" />
            <span class="ml-4 text-l hidden sm:block whitespace-nowrap">Terms of Service</span>
          </button>
        </router-link>

        <!-- Log Out Button -->
        <div title="Log Out" @click="handleSignOut">
          <!-- Large Screen Button -->
          <button class="w-full py-3 px-4 text-white rounded-full font-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed hidden sm:block">
            <span class="font-bold"> Log Out </span>
          </button>
          <!-- Mobile Screen Button -->
          <button class="w-full py-3 px-4 text-white rounded-full font-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed block sm:hidden">
            <span class="font-bold"> <LogoutIcon class="text-xl" /> </span>
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { HomeIcon, UserIcon, IdentificationIcon, FingerPrintIcon, ClipboardIcon, LogoutIcon } from "@heroicons/vue/solid";
import Button from "./Button.vue";

const props = defineProps<{ user: Record<string, any> }>();
const emit = defineEmits();

const handleSignOut = () => {
  emit("signOut");
};

const selectTab = (tab: string) => {
  emit("tabSelected", tab);
};
</script>
