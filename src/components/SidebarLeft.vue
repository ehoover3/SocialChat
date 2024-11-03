<!-- src/components/SidebarLeft.vue -->
<template>
  <div class="flex flex-col items-center h-screen">
    <div class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20">
      <div class="w-8 h-8">
        <LogoSocialMedia />
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

      <div class="hidden xl:block" title="Log Out" @click="handleSignOut">
        <UIButton liquid size="lg">
          <span class="font-bold"> Log Out </span>
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, UserIcon } from "@heroicons/vue/solid";
import SidebarLeftTab from "./SidebarLeftTab.vue";
import UIButton from "./UI/UIButton.vue";
import { defineProps, defineEmits } from "vue";
import LogoSocialMedia from "./LogoSocialMedia.vue";
const props = defineProps<{ user: Record<string, any> }>();
const emit = defineEmits();

const handleSignOut = () => {
  emit("signOut");
};
</script>
