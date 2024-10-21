<!-- pages/profile.vue -->

<template>
  <div class="w-full max-w-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 mt-4 text-gray-800 dark:text-white">Edit Your Profile</h1>

    <UIInput v-model="userData.name" label="Name" :placeholder="userData.name" />
    <UIInput v-model="userData.username" label="Username" :placeholder="userData.username" class="mt-4" />
    <UIInput v-model="userData.email" label="Email" type="email" :placeholder="userData.email" class="mt-4" />
    <UIInput v-model="userData.password" label="Password" type="password" class="mt-4" placeholder="Leave blank to keep current password" />
    <UIInput v-model="userData.repeatPassword" label="Repeat Password" type="password" class="mt-4" placeholder="Leave blank to keep current password" />

    <label class="block mt-4 text-gray-800 dark:text-white">Profile Image</label>
    <div class="grid grid-cols-3 gap-2 mt-2">
      <img v-for="image in animalImages" :key="image" :src="`${image}`" alt="Animal Profile" class="w-full h-24 object-cover cursor-pointer rounded-full transition" :class="{ 'border-white-500 border-8': userData.profileImage === image }" @click="userData.profileImage = image" />
    </div>

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
const { useAuthUser, updateUser, setUser } = useAuth();
const authUser = useAuthUser();
const userData = reactive({ ...authUser.value });
const message = ref("");
const isLoading = ref(false);
const success = ref(false);
const animalImages = ["/images/animals/cat.png", "/images/animals/deer.png", "/images/animals/dog.png", "/images/animals/elephant.png", "/images/animals/fox.png", "/images/animals/monkey.png", "/images/animals/panda.png", "/images/animals/pig.png", "/images/animals/raccoon.png"];

const handleSave = async () => {
  isLoading.value = true;
  try {
    console.table(`profile.vue > userData: ${JSON.stringify(userData)}`);
    await updateUser(userData);
    message.value = "Profile updated successfully!";
    success.value = true;
    setUser(userData);
  } catch (error) {
    console.log(error);
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
