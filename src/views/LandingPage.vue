<template>
  <div class="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
    <div class="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-4">Welcome to SocialApp</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-6">Sign in or create an account to get started!</p>
      <div class="space-y-4">
        <!-- Username input -->
        <input v-model="username" type="text" placeholder="Username" class="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400" />
        <!-- Email input (for sign up) -->
        <input v-model="email" type="email" placeholder="Email" class="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400" />
        <!-- Password input -->
        <input v-model="password" type="password" placeholder="Password" class="w-full py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400" />
        <div class="flex justify-between">
          <button @click="handleSignUp" class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">Create Account</button>
          <button @click="handleSignIn" class="w-full ml-2 py-2 px-4 bg-gray-500 text-white font-semibold rounded hover:bg-gray-600 transition">Sign In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { signUp } from "aws-amplify/auth";

const emit = defineEmits();

const username = ref("");
const password = ref("");
const email = ref("");
const phoneNumber = ref(""); // Optional: include phone number if you want

async function handleSignUp() {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: username.value,
      password: password.value,
      options: {
        userAttributes: {
          email: email.value,
          phone_number: phoneNumber.value, // Optional if you are collecting this
        },
      },
    });
    console.log("Sign up successful:", { isSignUpComplete, userId, nextStep });
    // Handle next step or confirmation message
  } catch (error) {
    console.error("Error during sign up:", error);
    // Handle error (e.g., display error message to the user)
  }
}

function handleSignIn() {
  emit("triggerAuth", "signIn");
}
</script>
