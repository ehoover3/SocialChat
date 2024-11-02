<!-- src/components/SidebarLeft.vue -->
<template>
  <div class="flex flex-col h-screen">
    <div class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20">
      <div class="w-8 h-8">
        <!-- <LogoSocialMedia /> -->
      </div>
    </div>

    <div class="mt-2 space-y-3">
      <SidebarLeftTab title="Home">
        <template v-slot:icon>
          <HomeIcon />
        </template>
        <template v-slot:name> Home </template>
      </SidebarLeftTab>

      <SidebarLeftTab to="/profile" title="Profile">
        <template v-slot:icon>
          <UserIcon />
        </template>
        <template v-slot:name> Profile </template>
      </SidebarLeftTab>

      <button class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white" @click="handleSignOut">Sign Out</button>

      <!-- <div class="hidden xl:block" title="Log Out" @click="handleLogout">
        <UIButton liquid size="lg">
          <span class="font-bold"> Log Out </span>
        </UIButton>
      </div> -->

      <!-- <div class="block xl:hidden" title="Log Out" @click="handleLogout">
        <UIButton @on-click="emits('onTweet')">
          <div class="w-6 h-6 font-bold">
            <LogoutIcon />
          </div>
        </UIButton>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, UserIcon } from "@heroicons/vue/solid";
import { LogoutIcon } from "@heroicons/vue/outline";
import SidebarLeftTab from "./SidebarLeftTab.vue";

import { defineProps, defineEmits } from "vue";

const props = defineProps<{ user: Record<string, any> }>();
const emit = defineEmits();

const handleSignOut = () => {
  emit("signOut");
};
</script>
