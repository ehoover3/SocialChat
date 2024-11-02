<!-- THIS ONE -->
<template>
  <div class="border-x border-white-200 dark:border-gray-700">
    <div class="sticky top-0 px-4 py-3 backdrop-blur-md bg-white/80 dark:bg-dim-900/80">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{ title }}</h2>
    </div>

    <div>
      <div class="border-b border-white-200 dark:border-gray-700">
        <!-- POST TODO HERE -->
        <!-- <TweetForm :user="user" @on-success="handleFormSuccess" /> -->
      </div>
      <Todos :user="user" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Todos from "./Todos.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["signOut"]);
</script>
