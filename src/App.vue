<!-- src/App.vue -->
<template>
  <div :class="isUserLoggedIn ? 'bg-cover-logged-in' : 'bg-cover-logged-out'">
    <nav v-if="!isUserLoggedIn" class="flex items-center space-x-4 p-4 w-full">
      <img src="@/assets/png/logo.png" class="h-12 w-12 ml-5 mt-1 flex items-center" />
      <div class="text-4xl font-semibold text-gray-700 flex">Social Chat</div>
    </nav>

    <div class="min-h-screen flex flex-col">
      <div class="flex-grow flex items-center justify-center">
        <authenticator :form-fields="formFields">
          <template v-slot:sign-in-header>
            <div class="flex flex-col items-center justify-center mt-8 p-4 space-y-2">
              <h3 class="text-5xl font-semibold text-gray-700">Explore Adventures,</h3>
              <h3 class="text-5xl font-semibold text-gray-700">Share Your Story</h3>
            </div>
          </template>

          <template v-slot:sign-up-header>
            <div class="flex flex-col items-center justify-center mt-8 p-4 space-y-2">
              <h3 class="text-5xl font-semibold text-gray-700">Explore Adventures,</h3>
              <h3 class="text-5xl font-semibold text-gray-700">Share Your Story</h3>
            </div>
          </template>

          <template v-slot:footer>
            <div style="padding: var(--amplify-space-large); text-align: center">
              <p class="amplify-text text-white">© 2024 Eric Hoover. All Rights Reserved.</p>
            </div>
          </template>

          <template v-slot="{ user, signOut }">
            <div>
              <nav class="flex items-center space-x-4 p-4 w-full min-w-screen" style="background-color: #1876f2">
                <img src="@/assets/png/logo.png" class="h-12 w-12 ml-5 mt-1" />
                <div class="text-4xl font-semibold text-gray-50">Social Chat</div>
              </nav>

              <div v-if="user" class="flex min-h-screen">
                <SidebarLeft
                  :user="user"
                  @signOut="
                    () => {
                      signOut();
                      isUserLoggedIn = false;
                    }
                  "
                  @tabSelected="setSelectedTab" />
                <Main :user="user" :selectedTab="selectedTab" />
              </div>
            </div>
            <div v-if="user && !isUserLoggedIn">
              {{ (isUserLoggedIn = true) }}
            </div>
          </template>
        </authenticator>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import SidebarLeft from "./components/SidebarLeft.vue";
import Main from "./components/Main.vue";
import "@aws-amplify/ui-vue/styles.css";
import "./assets/tailwind.css";

const isUserLoggedIn = ref(false);
const selectedTab = ref("home");
const emit = defineEmits();
const setSelectedTab = (tab: string) => {
  selectedTab.value = tab;
};

const selectTab = (tab: string) => {
  setSelectedTab(tab);
  emit("tabSelected", tab);
};

const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
    },
  },
  signUp: {
    password: {
      label: "Password:",
      placeholder: "Enter your Password:",
      isRequired: false,
      order: 1,
    },
    confirm_password: {
      label: "Confirm Password:",
      order: 2,
    },
  },
  forceNewPassword: {
    password: {
      placeholder: "Enter your Password:",
    },
  },
  forgotPassword: {
    username: {
      placeholder: "Enter your email:",
    },
  },

  confirmResetPassword: {
    confirmation_code: {
      placeholder: "Enter your Confirmation Code:",
      label: "New Label",
      isRequired: false,
    },
    confirm_password: {
      placeholder: "Enter your Password Please:",
    },
  },
  setupTotp: {
    QR: {
      totpIssuer: "test issuer",
      totpUsername: "amplify_qr_test_user",
    },
    confirmation_code: {
      label: "New Label",
      placeholder: "Enter your Confirmation Code:",
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      label: "New Label",
      placeholder: "Enter your Confirmation Code:",
      isRequired: false,
    },
  },
};
</script>

<style scoped>
:root {
  --primary-color: #1876f2;
  --secondary-color: #495057;
  --accent-color: #ffc107;
  --text-color: #343a40;
  --background-color: #f8f9fa;
}

body {
  background-color: var(--background-color);
}

.bg-cover-logged-out {
  background-color: #285e6c;
  background-image: url("@/assets/png/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
