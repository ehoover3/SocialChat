<!-- src/components/UI/UIButton.vue -->

<template>
  <button class="flex justify-center text-white rounded-full font-sm disabled:bg-blue-300 disabled:cursor-not-allowed" :style="{ backgroundColor: props.disabled ? '#93c5fd' : 'rgb(37, 99, 235)' }" :disabled="props.disabled" :class="classes" @click="handleClick">
    <span :class="textFontSize">
      <slot />
    </span>
  </button>
</template>

<script setup>
import { computed } from "vue";

const emits = defineEmits(["onClick"]);

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
  },
  liquid: {
    type: Boolean,
    default: false,
  },
});

const paddingClasses = computed(() => {
  switch (props.size) {
    case "sm":
      return "py-2 px-3";
    case "lg":
      return "px-4 py-3";
    default:
      return "px-3 py-3";
  }
});

const textFontSize = computed(() => {
  switch (props.size) {
    case "lg":
      return "text-md";
    default:
      return "text-sm";
  }
});

const defaultWidth = computed(() => {
  switch (props.size) {
    default:
      return "w-min";
  }
});

const classes = computed(() => `${paddingClasses.value} ${props.liquid ? "w-full" : defaultWidth.value}`);

function handleClick(event) {
  emits("onClick", event);
}
</script>
