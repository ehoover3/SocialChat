<!-- src/App.vue -->
<template>
  <div :class="isUserLoggedIn ? 'bg-cover-logged-in' : 'bg-cover-logged-out'">
    <nav v-if="!isUserLoggedIn" class="flex items-center space-x-4 p-4 w-full">
      <img src="@/assets/images/logo.png" class="h-12 w-12 ml-5 mt-1" />
      <div class="text-4xl font-semibold text-gray-700">Nature Chat</div>
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
            <!-- <div class="flex flex-col items-center"> -->
            <div class="min-h-screen flex flex-row">
              <div v-if="isAuthenticating" class="text-lg mb-4">Welcome! Please authenticate...</div>
              <div v-if="user" class="flex-grow flex">
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
                <MobileFooter :selectTab="selectTab" />
              </div>
              <SidebarRight :darkMode="darkMode" @toggleDarkMode="toggleDarkMode" />
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
import SidebarRight from "./components/SidebarRight.vue";
import Main from "./components/Main.vue";
import "@aws-amplify/ui-vue/styles.css";
import "./assets/tailwind.css";
import MobileFooter from "./components/MobileFooter.vue";

const darkMode = ref(true);
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
};

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
body {
  background-color: #285e6c;
  margin: 0;
  min-height: 100vh;
}

.bg-cover-logged-out {
  background-color: #285e6c;
  background-image: url("@/assets/images/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.bg-cover-logged-in {
  margin: auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  overflow: auto;
  background: linear-gradient(315deg, rgba(13, 122, 117, 1) 3%, rgba(60, 132, 206, 1) 38%, rgb(35, 155, 173) 68%, rgba(38, 170, 224, 1) 98%);
  animation: gradient 15s ease infinite;
  background-size: 400% 400%;
  background-attachment: fixed;
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.wave {
  background: rgb(255 255 255 / 25%);
  border-radius: 1000% 1000% 0 0;
  position: fixed;
  width: 200%;
  height: 12em;
  animation: wave 10s -3s linear infinite;
  transform: translate3d(0, 0, 0);
  opacity: 0.8;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.wave:nth-of-type(2) {
  bottom: -1.25em;
  animation: wave 18s linear reverse infinite;
  opacity: 0.8;
}

.wave:nth-of-type(3) {
  bottom: -2.5em;
  animation: wave 20s -1s reverse infinite;
  opacity: 0.9;
}

@keyframes wave {
  2% {
    transform: translateX(1);
  }

  25% {
    transform: translateX(-25%);
  }

  50% {
    transform: translateX(-50%);
  }

  75% {
    transform: translateX(-25%);
  }

  100% {
    transform: translateX(1);
  }
}
</style>
