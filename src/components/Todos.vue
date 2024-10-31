<script setup lang="ts">
import "@/assets/main.css";
import { onMounted, ref } from "vue";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";

const props = defineProps<{
  user: any | null;
}>();

const client = generateClient<Schema>();
library.add(faTrash);

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
      todos.value = items.map((todo) => ({
        ...todo,
        createdAt: todo.createdAt ? formatDate(todo.createdAt) : "Unknown Date",
        email: todo.email || "No Email",
      }));
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
    email: userEmail, // Store the user's email instead of userId
  })
    .then(() => {
      listTodos();
    })
    .catch((error) => {
      console.error("Error creating todo:", error);
    });
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

<template>
  <main>
    <h1>My todos</h1>
    <button @click="createTodo">+ new</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <div class="todo-content">
          <span class="todo-text">{{ todo.content }}</span>
          <span class="todo-date">{{ todo.createdAt }}</span>
          <span class="todo-email">{{ todo.email || "Unknown User" }}</span>
        </div>
        <FontAwesomeIcon icon="trash" @click.stop="deleteTodo(todo.id)" class="delete-icon" />
      </li>
    </ul>
  </main>
</template>

<style>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease-in-out;
}

.todo-item:hover {
  background-color: #f9f9f9;
}

.todo-content {
  display: flex;
  flex-direction: column;
}

.todo-text {
  font-weight: 500;
  color: #333;
}

.todo-date {
  font-size: 0.85rem;
  color: #888;
  margin-top: 4px;
}

.delete-icon {
  cursor: pointer;
  color: #e63946;
  transition: transform 0.2s ease, color 0.2s ease;
}

.delete-icon:hover {
  color: #d62828;
  transform: scale(1.1);
}
</style>
