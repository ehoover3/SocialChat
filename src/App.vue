<!-- src/App.vue -->

<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      <div class="flex-grow flex items-center justify-center">
        <div>HELLO</div>
        <authenticator :form-fields="formFields">
          <!-- <template v-slot:header class="bg-pink-500">
            <div style="text-align: center" class="text-red-500 text-6xl">Connect with friends.</div>
            <div style="text-align: center" class="text-red-500 text-2xl">Join today.</div>
          </template>

          <template v-slot:sign-in-header>
            <div class="flex items-center flex-col justify-center mt-8 p-4 space-x-2 bg-red-500">
              <h3 class="text-2xl font-semibold text-black-900 dark:text-black-100">Welcome to Social App</h3>
              <div>Sign in to your account</div>
            </div>
          </template>

          <template v-slot:sign-in-footer>
            <div style="text-align: center" class="bg-red-500">
              <button @click="toForgotPassword" class="amplify-button amplify-field-group__control" data-fullwidth="false" data-size="small" data-variation="link" type="button" style="font-weight: normal">Reset Password</button>
            </div>
          </template>

          <template v-slot:sign-up-header>
            <div class="flex items-center flex-col justify-center mt-8 p-4 space-x-2 bg-green-500">
              <h3 class="text-2xl font-semibold text-black-900 dark:text-black-100">Welcome to Social App</h3>
              <div>Create your account</div>
            </div>
          </template>

          <template v-slot:sign-up-footer>
            <div style="text-align: center" class="bg-green-500">
              <button @click="toSignIn" class="amplify-button amplify-field-group__control" data-fullwidth="false" data-size="small" data-variation="link" type="button" style="font-weight: normal">Back to Sign In</button>
            </div>
          </template>

          <template v-slot:footer>
            <div style="padding: var(--amplify-space-large); text-align: center" class="bg-green-500">
              <p class="amplify-text" style="color: var(--amplify-colors-neutral-80)">© 2024 Eric Hoover. All Rights Reserved.</p>
            </div>
          </template>

          <template v-slot:confirm-sign-up-header>
            <h3 class="amplify-heading" style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)">Enter Information:</h3>
          </template>

          <template v-slot:confirm-sign-up-footer>
            <div>Footer Information</div>
          </template>

          <template v-slot:setup-totp-header>
            <h3 class="amplify-heading" style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)">Enter Information:</h3>
          </template>

          <template v-slot:setup-totp-footer>
            <div>Footer Information</div>
          </template>

          <template v-slot:confirm-sign-in-header>
            <h3 class="amplify-heading" style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)">Enter Information:</h3>
          </template>

          <template v-slot:confirm-sign-in-footer>
            <div>Footer Information</div>
          </template>

          <template v-slot:forgot-password-header>
            <h3 class="amplify-heading" style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)">Enter Information:</h3>
          </template>

          <template v-slot:forgot-password-footer>
            <div>Footer Information</div>
          </template>

          <template v-slot:confirm-reset-password-header>
            <h3 class="amplify-heading" style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)">Enter Information:</h3>
          </template>

          <template v-slot:confirm-reset-password-footer>
            <div>Footer Information</div>
          </template> -->

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
    confirm_password: {
      label: "Confirm Password:",
      order: 1,
    },
    password: {
      label: "Password:",
      placeholder: "Enter your Password:",
      isRequired: false,
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
/* .amplify-button.amplify-button--primary {
  background-color: red !important;
}

.amplify-button.amplify-button--link {
  color: orange !important;
  background-color: red !important;
}

.amplify-tabs__item--active {
  color: orange !important;
  border-color: orange !important;
  background-color: red !important;
}

.amplify-tabs__item {
  color: orange !important;
  background-color: red !important;
}

.amplify-field__show-password {
  color: orange !important;
  background-color: red !important;
}

.amplify-input {
  border-color: red !important;
  color: orange !important;
  background-color: red !important;
}

.amplify-label {
  color: orange !important;
  background-color: red !important;
}

.amplify-authenticator__column {
  background-color: red !important;
}

.amplify-input {
  background-color: red !important;
}

[data-amplify-form] {
  background-color: red !important;
}

[data-amplify-authenticator] {
  background-color: pink !important;
}

#signIn-panel {
  background-color: red !important;
}

[data-amplify-footer] {
  background-color: red !important;
}

.amplify-tabs__panel {
  background-color: red !important;
} */
</style>
