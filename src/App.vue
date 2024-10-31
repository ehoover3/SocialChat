<!-- src/App.vue -->
<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import Todos from "./components/Todos.vue";
import SidebarLeft from "./components/SidebarLeft.vue";

import SidebarRight from "./components/SidebarRight.vue";
</script>

<template>
  <div class="app-layout">
    <SidebarLeft />
    <main class="main-content">
      <authenticator>
        <template v-slot="{ user, signOut }">
          <h1>Hello {{ user?.signInDetails?.loginId.split("@")[0] }}'s todos</h1>
          <Todos :user="user" />
          <button @click="signOut">Sign Out</button>
        </template>
      </authenticator>
    </main>
    <SidebarRight />
  </div>
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

.main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #ffffff;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}

button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
