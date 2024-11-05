<!-- src/components/SidebarLeft.vue -->
<template>
  <aside class="hidden md:block w-64 sticky top-0 h-screen shadow-lg">
    <div class="flex flex-col items-center h-screen">
      <div class="mt-2 space-y-3">
        <SidebarLeftTab title="Home" @click="selectTab('home')">
          <template v-slot:icon>
            <HomeIcon />
          </template>
          <template v-slot:name> Home </template>
        </SidebarLeftTab>

        <SidebarLeftTab title="Profile" @click="selectTab('profile')">
          <template v-slot:icon>
            <UserIcon />
          </template>
          <template v-slot:name> Profile </template>
        </SidebarLeftTab>

        <div class="w-full h-px bg-white my-3"></div>

        <SidebarLeftTab title="Profile" @click="selectTab('privacyPolicy')">
          <template v-slot:icon>
            <IdentificationIcon />
          </template>
          <template v-slot:name> Privacy Policy </template>
        </SidebarLeftTab>

        <SidebarLeftTab title="Profile" @click="selectTab('cookiePolicy')">
          <template v-slot:icon>
            <FingerPrintIcon />
          </template>
          <template v-slot:name> Cookie Policy </template>
        </SidebarLeftTab>

        <SidebarLeftTab title="Profile" @click="selectTab('termsOfService')">
          <template v-slot:icon>
            <ClipboardIcon />
          </template>
          <template v-slot:name> Terms of Service </template>
        </SidebarLeftTab>

        <div title="Log Out" @click="handleSignOut">
          <UIButton liquid size="lg">
            <span class="font-bold"> Log Out </span>
          </UIButton>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { HomeIcon, UserIcon, IdentificationIcon, FingerPrintIcon, ClipboardIcon } from "@heroicons/vue/solid";
import SidebarLeftTab from "./SidebarLeftTab.vue";
import UIButton from "./UI/UIButton.vue";

const props = defineProps<{ user: Record<string, any> }>();
const emit = defineEmits();

const handleSignOut = () => {
  emit("signOut");
};

const selectTab = (tab: string) => {
  emit("tabSelected", tab);
};
</script>
