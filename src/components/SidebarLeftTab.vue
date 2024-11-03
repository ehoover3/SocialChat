<!-- components/Sidebar/Left/Tab.vue -->

<template>
  <div class="flex items-center p-3 text-black rounded-full w-min hover:bg-gray-200 dark:hover:bg-dim-200 dark:text-white">
    <div class="w-6 h-6 text-dark">
      <slot name="icon"></slot>
    </div>

    <div class="ml-4 text-xl xl:block">
      <slot name="name"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>
