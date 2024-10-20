<!-- components/Sidebar/Left/index.vue -->
<template>
  <div class="flex flex-col h-screen">
    <div class="p-2 my-2 rounded-full hover:bg-blue-50 w-min dark:hover:bg-white/20" :class="defaultTransition">
      <nuxt-link to="/">
        <div class="w-8 h-8">
          <LogoSocialMedia />
        </div>
      </nuxt-link>
    </div>

    <div class="mt-2 space-y-3">
      <SidebarLeftTab to="/" active title="Home">
        <template v-slot:icon>
          <HomeIcon />
        </template>
        <template v-slot:name> Home </template>
      </SidebarLeftTab>

      <SidebarLeftTab to="/profile" :active="isActive('/profile')" title="Profile">
        <template v-slot:icon>
          <UserIcon />
        </template>
        <template v-slot:name> Profile </template>
      </SidebarLeftTab>

      <div class="hidden xl:block" title="Log Out" @click="handleLogout">
        <UIButton liquid size="lg">
          <span class="font-bold"> Log Out </span>
        </UIButton>
      </div>

      <div class="block xl:hidden" title="Log Out" @click="handleLogout">
        <UIButton @on-click="emits('onTweet')">
          <div class="w-6 h-6 font-bold">
            <LogoutIcon />
          </div>
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { HomeIcon, UserIcon } from "@heroicons/vue/solid";
import { LogoutIcon } from "@heroicons/vue/outline";
import { useRoute } from "vue-router";
const router = useRouter();

const { logout } = useAuth();
const { defaultTransition } = useTailwindConfig();
const route = useRoute();
const isActive = (path) => {
  return path === route.path;
};
const handleLogout = async () => {
  try {
    await logout();
    console.log("logout success");
    router.push("/");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>
