<!-- src/components/Main.vue -->
<template>
  <main class="bg-white rounded-lg m-2 mt-4 w-full mx-auto">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">What is on your mind, {{ user?.signInDetails?.loginId.split("@")[0] }}?</h2>

    <div class="mb-4 flex items-center space-x-2 mr-4">
      <input v-model="newPostContent" type="text" placeholder="Enter your message..." @keyup.enter="createPost" class="py-2 px-4 border border-gray-300 rounded-lg w-full" />
      <button @click="createPost" class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-20">Submit</button>
    </div>

    <ul class="space-y-4">
      <li v-for="todo in todos" :key="todo.id" class="flex justify-between items-center p-4 border border-gray-400 rounded-lg bg-gray-50">
        <div class="flex flex-col w-full mr-4">
          <span v-if="!todo.isEditing" class="font-medium text-gray-900">{{ todo.content }}</span>
          <textarea v-else v-model="todo.editedContent" class="py-1 px-2 border border-gray-300 rounded-lg w-full resize-y"></textarea>

          <div class="text-sm text-gray-500">
            <span class="mr-2">{{ todo.formattedCreatedAt }}</span>
            <span>• {{ todo.email || "Unknown User" }}</span>
          </div>
        </div>

        <div class="flex space-x-3">
          <FontAwesomeIcon v-if="!todo.isEditing" icon="edit" @click="toggleEdit(todo)" class="text-blue-500 cursor-pointer hover:text-blue-600 transition ml-2" />
          <FontAwesomeIcon v-if="!todo.isEditing && props.user?.signInDetails?.loginId === todo.email" icon="trash" @click.stop="deletePost(todo.id)" class="text-red-500 cursor-pointer hover:text-red-600 transition ml-2" />
        </div>

        <div v-if="todo.isEditing" class="flex flex-col space-y-2">
          <button @click="saveEdit(todo)" class="py-1.5 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-20">Save</button>
          <button @click="cancelEdit(todo)" class="py-1.5 px-2 bg-gray-400 text-white rounded hover:bg-gray-500 w-20">Cancel</button>
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
  editedContent: string;
  createdAt: string;
  email: string;
  formattedCreatedAt: string;
  isEditing: boolean;
}

const props = defineProps<{
  user: any | null;
}>();

library.add(faEdit);
library.add(faTrash);

const client = generateClient<Schema>();
const todos = ref<FormattedTodo[]>([]);

const showInput = ref(false);
const newPostContent = ref("");

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
          isEditing: false,
          editedContent: todo.content,
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as FormattedTodo[];
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
    content: newPostContent.value,
    email: userEmail,
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

function toggleEdit(todo: FormattedTodo) {
  todo.isEditing = !todo.isEditing;
}

function saveEdit(todo: FormattedTodo) {
  if (todo.editedContent && todo.editedContent !== todo.content) {
    client.models.Todo.update({ id: todo.id, content: todo.editedContent })
      .then(() => {
        todo.isEditing = false;
        listPosts();
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  } else {
    todo.isEditing = false;
  }
}

function cancelEdit(todo: FormattedTodo) {
  todo.isEditing = false;
  todo.editedContent = todo.content;
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
