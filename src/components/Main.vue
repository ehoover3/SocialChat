<!-- src/components/Main.vue -->
<template>
  <div class="flex-grow border-x border-gray-200 dark:border-gray-700">
    <Messages :user="user" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import Messages from "./Messages.vue";

const props = defineProps({ user: Object });
</script>
