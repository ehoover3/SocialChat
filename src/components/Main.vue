<!-- src/components/Main.vue -->
<template>
  <main class="main-content">
    <h1>Hello {{ user?.signInDetails?.loginId.split("@")[0] }}'s todos</h1>
    <Todos :user="user" />
  </main>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Todos from "./Todos.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["signOut"]);
</script>

<style scoped>
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
