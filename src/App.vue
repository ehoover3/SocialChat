<!-- src/App.vue -->
<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import SidebarLeft from "./components/SidebarLeft.vue";
import SidebarRight from "./components/SidebarRight.vue";
import Main from "./components/Main.vue";
</script>

<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <div class="app-layout">
        <SidebarLeft @signOut="signOut" />
        <Main :user="user" @signOut="signOut" />
        <SidebarRight />
      </div>
    </template>
  </authenticator>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

.sidebar-left,
.sidebar-right {
  flex-shrink: 0;
  background-color: #f4f4f9;
}
</style>
