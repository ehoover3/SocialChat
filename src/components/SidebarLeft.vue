<!-- src/components/SidebarLeft.vue -->
<template>
  <aside class="rounded-lg m-2 mt-4 border border-gray-400 bg-gray-50 p-2">
    <div class="flex flex-col items-center">
      <div class="mt-2 space-y-3">
        <!-- Home Tab -->
        <div class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200" title="Home" @click="selectTab('home')">
          <div class="w-6 h-6 text-dark">
            <HomeIcon />
          </div>
          <div class="ml-4 text-xl hidden sm:block whitespace-nowrap">Home</div>
        </div>

        <!-- Profile Tab -->
        <div class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200" title="Profile" @click="selectTab('profile')">
          <div class="w-6 h-6 text-dark">
            <UserIcon />
          </div>
          <div class="ml-4 text-xl hidden sm:block whitespace-nowrap">Profile</div>
        </div>

        <!-- Privacy Policy Tab -->
        <div class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200" title="Privacy Policy" @click="selectTab('privacyPolicy')">
          <div class="w-6 h-6 text-dark">
            <IdentificationIcon />
          </div>
          <div class="ml-4 text-xl hidden sm:block whitespace-nowrap">Privacy Policy</div>
        </div>

        <!-- Cookie Policy Tab -->
        <div class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200" title="Cookie Policy" @click="selectTab('cookiePolicy')">
          <div class="w-6 h-6 text-dark">
            <FingerPrintIcon />
          </div>
          <div class="ml-4 text-xl hidden sm:block whitespace-nowrap">Cookie Policy</div>
        </div>

        <!-- Terms of Service Tab -->
        <div class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200" title="Terms of Service" @click="selectTab('termsOfService')">
          <div class="w-6 h-6 text-dark">
            <ClipboardIcon />
          </div>
          <div class="ml-4 text-xl hidden sm:block whitespace-nowrap">Terms of Service</div>
        </div>

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
