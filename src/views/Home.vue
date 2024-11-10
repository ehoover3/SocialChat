<!-- src/views/Home.vue -->
<template>
  <main class="bg-white rounded-lg m-2 mt-4">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">What is on your mind, {{ user?.signInDetails?.loginId.split("@")[0] }}?</h2>

    <div class="mb-4 flex items-center space-x-2 mr-4">
      <input v-model="newPostContent" type="text" placeholder="Enter your message..." @keyup.enter="createPost" class="py-2 px-4 border border-gray-300 rounded-lg w-full" />
      <button @click="createPost" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-20">Submit</button>
    </div>

    <ul class="space-y-4">
      <li v-for="userMessage in userMessages" :key="userMessage.id" class="flex justify-between items-center p-4 border border-gray-400 rounded-lg bg-gray-50">
        <div class="flex flex-col w-full mr-4">
          <span v-if="!userMessage.isEditing && userMessage.content" class="font-medium text-gray-900">{{ userMessage.content }}</span>
          <img v-if="!userMessage.isEditing && userMessage.url" :src="userMessage.url" alt="User Post Image" class="rounded-lg" />

          <textarea v-else v-model="userMessage.editedContent" class="py-1 px-2 border border-gray-300 rounded-lg w-full resize-y"></textarea>

          <div class="text-sm text-gray-500">
            <span class="mr-2">{{ userMessage.formattedCreatedAt }}</span>
            <span>• {{ userMessage.email?.split("@")[0] || "Unknown User" }}</span>
          </div>
        </div>

        <div class="flex space-x-3 mr-2.5">
          <FontAwesomeIcon v-if="!userMessage.isEditing" icon="edit" @click="toggleEdit(userMessage)" class="text-blue-500 cursor-pointer hover:text-blue-600 text-2xl" />
          <FontAwesomeIcon v-if="!userMessage.isEditing && props.user?.signInDetails?.loginId === userMessage.email" icon="trash" @click.stop="deletePost(userMessage.id)" class="text-red-500 cursor-pointer hover:text-red-600 text-2xl" />
        </div>

        <div v-if="userMessage.isEditing" class="flex flex-col space-y-2">
          <button @click="saveEdit(userMessage)" class="py-1.5 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-20">Save</button>
          <button @click="cancelEdit(userMessage)" class="py-1.5 px-2 bg-gray-400 text-white rounded hover:bg-gray-500 w-20">Cancel</button>
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

interface FormattedUserMessage {
  id: string;
  content: string;
  editedContent: string;
  createdAt: string;
  email: string;
  formattedCreatedAt: string;
  isEditing: boolean;
  url: string;
}

const props = defineProps<{
  user: any | null;
}>();

library.add(faEdit);
library.add(faTrash);

const client = generateClient<Schema>();
const userMessages = ref<FormattedUserMessage[]>([]);

const showInput = ref(false);
const newPostContent = ref("");
const newPostUrl = ref("");

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

function listPosts() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      items.forEach((item, index) => {
        console.log(`Item ${index + 1}:`, item);
      });

      userMessages.value = items
        .map((userMessage) => ({
          ...userMessage,
          formattedCreatedAt: userMessage.createdAt ? formatDate(userMessage.createdAt) : "Unknown Date",
          email: userMessage.email || "No Email",
          isEditing: false,
          editedContent: userMessage.content,
          url: userMessage.url || "No URL",
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as FormattedUserMessage[];
    },
  });
}

function createPost() {
  const userEmail = props.user?.signInDetails?.loginId;
  if (!userEmail) {
    return;
  }

  if (newPostContent.value.trim() === "") {
    return;
  }

  client.models.Todo.create({
    email: userEmail,
    content: newPostContent.value,
    url: newPostUrl.value,
  })
    .then(() => {
      newPostContent.value = "";
      showInput.value = false;
      listPosts();
    })
    .catch((error) => {
      console.error("Error creating message:", error);
    });
}

function toggleEdit(userMessage: FormattedUserMessage) {
  userMessage.isEditing = !userMessage.isEditing;
}

function saveEdit(userMessage: FormattedUserMessage) {
  if (userMessage.editedContent && userMessage.editedContent !== userMessage.content) {
    client.models.Todo.update({ id: userMessage.id, content: userMessage.editedContent, url: userMessage.url || "" })
      .then(() => {
        userMessage.isEditing = false;
        listPosts();
      })
      .catch((error) => {
        console.error("Error updating user message:", error);
      });
  } else {
    userMessage.isEditing = false;
  }
}

function cancelEdit(userMessage: FormattedUserMessage) {
  userMessage.isEditing = false;
  userMessage.editedContent = userMessage.content;
}

function deletePost(id: string) {
  client.models.Todo.delete({ id })
    .then(() => {
      listPosts();
    })
    .catch((error) => {
      console.error("Error deleting user message:", error);
    });
}

onMounted(() => {
  listPosts();
});
</script>
