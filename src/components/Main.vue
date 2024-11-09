<!-- src/components/Main.vue -->
<template>
  <main class="bg-white rounded-lg m-2 mt-4 w-full">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">What is on your mind, {{ user?.signInDetails?.loginId.split("@")[0] }}?</h2>

    <!-- Conditional Input Field -->
    <div class="mb-4 flex items-center space-x-2">
      <input v-model="newPostContent" type="text" placeholder="Enter your message..." @keyup.enter="createPost" class="py-2 px-4 border border-gray-300 rounded-lg w-full" />
      <button @click="createPost" class="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Submit</button>
    </div>

    <ul class="space-y-4">
      <li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center p-4 border border-gray-400 rounded-lg bg-gray-50">
        <div class="flex flex-col">
          <span class="font-medium text-gray-900">{{ todo.content }}</span>
          <div class="text-sm text-gray-500">
            <span class="mr-2">{{ todo.formattedCreatedAt }}</span>
            <span>• {{ todo.email || "Unknown User" }}</span>
          </div>
        </div>

        <div class="flex space-x-3">
          <FontAwesomeIcon icon="edit" @click="editPost(todo)" class="text-blue-500 cursor-pointer hover:text-blue-600 transition ml-2" />
          <FontAwesomeIcon v-if="props.user?.signInDetails?.loginId === todo.email" icon="trash" @click.stop="deletePost(todo.id)" class="text-red-500 cursor-pointer hover:text-red-600 transition ml-2" />
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

interface FormattedTodo {
  id: string;
  content: string;
  createdAt: string;
  email: string;
  formattedCreatedAt: string;
}

const props = defineProps<{
  user: any | null;
}>();

library.add(faEdit);
library.add(faTrash);

const client = generateClient<Schema>();
const todos = ref<FormattedTodo[]>([]);

const showInput = ref(false); // Controls visibility of the input
const newPostContent = ref(""); // The content for the new post

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
      todos.value = items
        .map((todo) => ({
          ...todo,
          formattedCreatedAt: todo.createdAt ? formatDate(todo.createdAt) : "Unknown Date",
          email: todo.email || "No Email",
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as FormattedTodo[];
    },
  });
}

function createPost() {
  const userEmail = props.user?.signInDetails?.loginId;
  if (!userEmail) {
    alert("You must be logged in to create a message.");
    return;
  }

  if (newPostContent.value.trim() === "") {
    alert("Message content cannot be empty.");
    return;
  }

  client.models.Todo.create({
    content: newPostContent.value,
    email: userEmail,
  })
    .then(() => {
      newPostContent.value = ""; // Clear input after posting
      showInput.value = false; // Hide input field
      listPosts();
    })
    .catch((error) => {
      console.error("Error creating message:", error);
    });
}

function editPost(todo: any) {
  const newContent = window.prompt("Edit your message", todo.content);
  if (newContent && newContent !== todo.content) {
    client.models.Todo.update({ id: todo.id, content: newContent })
      .then(() => {
        listPosts();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  }
}

function deletePost(id: string) {
  client.models.Todo.delete({ id })
    .then(() => {
      listPosts();
    })
    .catch((error) => {
      console.error("Error deleting todo:", error);
    });
}

onMounted(() => {
  listPosts();
});
</script>
