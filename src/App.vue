<!-- src/App.vue -->
<template>
  <div class="bg-cover">
    <nav class="flex items-center space-x-4 p-4">
      <img src="@/assets/images/logo.png" class="h-12 w-12 ml-5 mt-1" />
      <div class="text-4xl">Nature Chat</div>
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

          <template v-slot="{ user, signOut, isAuthenticating }">
            <div class="flex flex-col items-center">
              <div v-if="isAuthenticating" class="text-lg mb-4">Welcome! Please authenticate...</div>
              <div class="flex-grow flex">
                <SidebarLeft v-if="user" :user="user || {}" @signOut="signOut" @tabSelected="setSelectedTab" />
                <Main v-if="user" :user="user" :selectedTab="selectedTab" />
                <SidebarRight :darkMode="darkMode" @toggleDarkMode="toggleDarkMode" />
                <MobileFooter v-if="user" :selectTab="selectTab" />
              </div>
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
import SidebarRight from "./components/SidebarRight.vue";
import Main from "./components/Main.vue";
import "@aws-amplify/ui-vue/styles.css";
import "./assets/tailwind.css";
import MobileFooter from "./components/MobileFooter.vue";
const darkMode = ref(true);
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
};

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
body {
  background-color: #285e6c;
  margin: 0;
  min-height: 100vh;
}

.bg-cover {
  background-color: #285e6c;
  background-image: url("@/assets/images/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
