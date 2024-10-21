<!-- components/Auth/Form.vue -->

<template>
  <div class="w-full">
    <form submit.prevent="handleAction">
      <div class="flex justify-center">
        <div class="w-10 h-10">
          <LogoSocialMedia />
        </div>
      </div>
      <div class="pt-5 space-y-6">
        <UIInput v-if="isSignup" label="Name" placeholder="Enter your name" v-model="data.name" />
        <UIInput v-model="data.username" label="Username" placeholder="Enter your username" />
        <UIInput v-if="isSignup" label="Email" placeholder="Enter your email" type="email" v-model="data.email" />
        <UIInput label="Password" placeholder="Enter your password" type="password" v-model="data.password" />
        <UIInput v-if="isSignup" label="Confirm Password" placeholder="Confirm your password" type="password" v-model="data.confirmPassword" />

        <UIButton @click="handleAction" @keydown.enter="handleAction" liquid :disabled="isButtonDisabled">
          {{ isSignup ? "Sign Up" : "Login" }}
        </UIButton>

        <div class="text-center pt-4">
          <a @click="toggleMode" class="cursor-pointer text-blue-500">
            {{ isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up" }}
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";

const data = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  loading: false,
});

const isSignup = ref(false);

function toggleMode() {
  isSignup.value = !isSignup.value;
  data.username = "";
  data.password = "";
  data.confirmPassword = "";
}

const handleAction = async () => {
  const { login, signup } = useAuth();

  data.loading = true;
  try {
    if (isSignup.value) {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await signup({
        username: data.username,
        password: data.password,
        repeatPassword: data.password,
        email: data.email,
        name: data.name,
      });
    } else {
      await login({
        username: data.username,
        password: data.password,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    data.loading = false;
  }
};

const isButtonDisabled = computed(() => {
  return !data.username || !data.password || data.loading || (isSignup.value && !data.confirmPassword);
});
</script>
