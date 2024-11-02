<!-- src/App.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import SidebarLeft from "./components/SidebarLeft.vue";
import SidebarRight from "./components/SidebarRight.vue";
import Main from "./components/Main.vue";
import "./assets/tailwind.css";

const darkMode = ref(true);
</script>

<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900 min-h-screen">
      <Authenticator>
        <template v-slot="{ user, signOut }">
          <div class="min-h-full">
            <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
              <!-- Sidebar Left (for Desktop) -->
              <div class="hidden md:block col-span-2">
                <div class="sticky top-0">
                  <SidebarLeft v-if="user" :user="user" @signOut="signOut" />
                </div>
              </div>

              <!-- Mobile Bottom Bar -->
              <div class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gray-800 text-white text-center">
                <button class="bg-blue-500 px-4 py-2 rounded-full">Tweet</button>
              </div>

              <!-- Main Content -->
              <main class="col-span-12 md:col-span-8 xl:col-span-6 pb-20 md:pb-0">
                <Main />
              </main>

              <!-- Sidebar Right (for Desktop) -->
              <div class="hidden md:block xl:col-span-4 md:col-span-3">
                <div class="sticky top-0">
                  <SidebarRight />
                </div>
              </div>
            </div>
          </div>
        </template>
      </Authenticator>
    </div>
  </div>
</template>
