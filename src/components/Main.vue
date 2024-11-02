<!-- src/components/Main.vue -->
<template>
  <div class="flex-grow border-x border-gray-200 dark:border-gray-700">
    <h1 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Welcome, {{ user?.signInDetails?.loginId }}</h1>
    <Todos :user="user" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import Todos from "./Todos.vue";

const props = defineProps({ user: Object });
</script>
