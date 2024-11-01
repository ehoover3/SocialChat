<!-- src/App.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import SidebarLeft from "./components/SidebarLeft.vue";
import SidebarRight from "./components/SidebarRight.vue";
import Main from "./components/Main.vue";
const darkMode = ref(true);
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-red dark:bg-dim-900">
      <authenticator>
        <template v-slot="{ user, signOut }">
          <div class="app-layout">
            <div class="hidden md:block xs-col-span-1 xl:col-span-2">
              <div class="sticky top-0">
                <SidebarLeft @signOut="signOut" />
              </div>
            </div>

            <main class="col-span-12 md:col-span-8 xl:col-span-6 pb-20 md:pb-0">
              <Main :user="user" @signOut="signOut" />
            </main>

            <div class="hidden col-span-12 md:block xl:col-span-4 md:col-span-3">
              <div class="sticky top-0">
                <SidebarRight />
              </div>
            </div>
          </div>
        </template>
      </authenticator>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}
</style>
