<!-- src/components/SidebarLeft.vue -->
<template>
  <aside class="sidebar-left">
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">Profile</a></li>
      <li><a href="#">Settings</a></li>
    </ul>
    <button @click="handleSignOut">Sign Out</button>
  </aside>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  user: Record<string, any>;
}>();

const emit = defineEmits();

const handleSignOut = () => {
  emit("signOut");
};
</script>

<style scoped>
.sidebar-left {
  flex-shrink: 0;
  background-color: #f4f4f9;
  padding: 20px;
}

.sidebar-left ul {
  list-style: none;
  padding: 0;
}

.sidebar-left li {
  margin: 10px 0;
}

.sidebar-left a {
  text-decoration: none;
  color: #007bff;
}

.sidebar-left a:hover {
  text-decoration: underline;
}

.sidebar-left button {
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.sidebar-left button:hover {
  background-color: #0056b3;
}
</style>
