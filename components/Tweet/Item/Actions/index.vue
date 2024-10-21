<!-- components/Tweet/Item/Actions/index.vue -->

<template>
  <div class="flex items-center justify-start w-full">
    <TweetItemActionsIcon color="blue" @on-click="emits('onCommentClick')" :size="size">
      <template v-slot:icon="{ classes }">
        <ChatIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ props.tweet.repliesCount }}
      </template>
    </TweetItemActionsIcon>
  </div>
</template>
<script setup>
import { ChatIcon } from "@heroicons/vue/outline";

const emits = defineEmits(["onCommentClick"]);

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const showStats = computed(() => props.compact);
const size = computed(() => (props.compact ? 5 : 8));
</script>
