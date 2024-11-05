<!-- src/components/Home.vue -->

<template>
  <main class="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is on your mind, {{ user?.signInDetails?.loginId.split("@")[0] }}?</h2>
    <button @click="createTodo" class="w-full mb-6 py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition">+ New Post</button>
    <ul class="space-y-4">
      <li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col">
          <span class="font-medium text-gray-900 dark:text-white">{{ todo.content }}</span>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            <span class="mr-2">{{ todo.createdAt }}</span>
            <span>• {{ todo.email || "Unknown User" }}</span>
          </div>
        </div>

        <div class="flex space-x-3">
          <FontAwesomeIcon icon="edit" @click="editTodo(todo)" class="text-blue-500 cursor-pointer hover:text-blue-600 transition ml-2" />
          <FontAwesomeIcon v-if="props.user?.signInDetails?.loginId === todo.email" icon="trash" @click.stop="deleteTodo(todo.id)" class="text-red-500 cursor-pointer hover:text-red-600 transition ml-2" />
        </div>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import "@/assets/main.css";
import { onMounted, ref } from "vue";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const props = defineProps<{
  user: any | null;
}>();

library.add(faEdit);
library.add(faTrash);

const client = generateClient<Schema>();
const todos = ref<Array<Schema["Todo"]["type"]>>([]);

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;
  return `${time} • ${formattedDate}`;
}

function listTodos() {
  client.models.Todo.observeQuery().subscribe({
    next: ({ items, isSynced }) => {
      todos.value = items
        .map((todo) => ({
          ...todo,
          formattedCreatedAt: todo.createdAt ? formatDate(todo.createdAt) : "Unknown Date",
          email: todo.email || "No Email",
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
  });
}

function createTodo() {
  const userEmail = props.user?.signInDetails?.loginId;
  console.log("userEmail:", userEmail);
  if (!userEmail) {
    alert("You must be logged in to create a todo.");
    return;
  }

  client.models.Todo.create({
    content: window.prompt("Todo content"),
    email: userEmail,
  })
    .then(() => {
      listTodos();
    })
    .catch((error) => {
      console.error("Error creating todo:", error);
    });
}

function editTodo(todo: any) {
  const newContent = window.prompt("Edit your todo", todo.content);
  if (newContent && newContent !== todo.content) {
    client.models.Todo.update({ id: todo.id, content: newContent })
      .then(() => {
        listTodos();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  }
}

function deleteTodo(id: string) {
  client.models.Todo.delete({ id })
    .then(() => {
      listTodos();
    })
    .catch((error) => {
      console.error("Error deleting todo:", error);
    });
}

onMounted(() => {
  listTodos();
});
</script>
