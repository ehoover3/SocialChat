<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import Todos from "./components/Todos.vue";
</script>

<template>
  <main>
    <authenticator>
      <template v-slot="{ user, signOut }">
        <h1>Hello {{ user?.signInDetails?.loginId.split("@")[0] }}'s todos</h1>
        <Todos :user="user" />
        <button @click="signOut">Sign Out</button>
      </template>
    </authenticator>
  </main>
</template>
