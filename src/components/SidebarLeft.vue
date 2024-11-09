<!-- src/components/SidebarLeft.vue -->
<template>
  <aside class="rounded-lg m-2 mt-4 border border-gray-400 bg-gray-50 p-2">
    <div class="flex flex-col items-center">
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
          <Button liquid size="lg">
            <span class="font-bold"> Log Out </span>
          </Button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { HomeIcon, UserIcon, IdentificationIcon, FingerPrintIcon, ClipboardIcon } from "@heroicons/vue/solid";
import SidebarLeftTab from "./SidebarLeftTab.vue";
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
