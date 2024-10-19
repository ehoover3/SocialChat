<template>
  <div class="w-full max-w-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 mt-4 text-gray-800 dark:text-white">Edit Your Profile</h1>

    <UIInput v-model="userData.name" label="Name" :placeholder="userData.name" />
    <UIInput v-model="userData.username" label="Username" :placeholder="userData.username" class="mt-4" />
    <UIInput v-model="userData.email" label="Email" type="email" :placeholder="userData.email" class="mt-4" />

    <UIButton @click="handleSave" :disabled="isButtonDisabled" liquid size="lg" class="mt-6">
      <span class="font-bold">{{ isLoading ? "Saving..." : "Save Changes" }}</span>
    </UIButton>

    <div v-if="message" class="mt-4 text-center" :class="{ 'text-green-500': success, 'text-red-500': !success }">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import useAuth from "@/composables/useAuth";
const { setUser, useAuthUser, updateUser } = useAuth();

const authUser = useAuthUser();
const userData = reactive({ ...authUser.value });

const message = ref("");
const isLoading = ref(false);
const success = ref(false);

const handleSave = async () => {
  isLoading.value = true;
  try {
    await updateUser(userData);
    message.value = "Profile updated successfully!";
    success.value = true;
    setUser(userData);
  } catch (error) {
    message.value = "Error updating profile. Please try again.";
    success.value = false;
  } finally {
    isLoading.value = false;
  }
};

const isButtonDisabled = computed(() => {
  return !userData.name || !userData.username || !userData.email || isLoading.value;
});
</script>
