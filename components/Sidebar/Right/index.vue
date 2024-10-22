<!-- components/Sidebar/Right/index.vue -->

<template>
  <div clas="flex flex-col">
    <!-- Search bar -->
    <div class="relative m-2">
      <div class="absolute flex items-center h-full pl-4 text-gray-600 cursor-pointer">
        <div class="w-6 h-6">
          <SearchIcon @click="handleSearch" />
        </div>
      </div>
      <input @keydown.enter="handleSearch" v-model="search" class="flex items-center w-full pl-12 text-sm font-normal text-black bg-gray-200 border border-gray-200 rounded-full shadow dark:text-gray-100 dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9" placeholder="Search tweet" type="text" />
    </div>

    <!-- Portfolio section -->
    <SidebarRightPreviewCard title="Portfolio">
      <SidebarRightPreviewCardItem>
        <a href="https://erichoover.org/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center flex-col p-2">
          <img class="w-16 h-16 rounded-full" src="/images/profile.png" alt="Profile" />
          <p class="mt-2 text-sm font-bold text-blue-500 cursor-pointer hover:underline">See my full portfolio</p>
        </a>
      </SidebarRightPreviewCardItem>
    </SidebarRightPreviewCard>

    <footer>
      <ul class="mx-2 my-4 text-xs text-gray-500">
        <li class="inline-block mx-2">
          <a href="#" class="hover:underline" @click.prevent="handleToggleDarkMode">{{ darkModeText }}</a>
        </li>
        <li class="inline-block mx-2">
          <a href="/privacypolicy" class="hover:underline">Privacy Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="/cookiepolicy" class="hover:underline">Cookie Policy</a>
        </li>
        <li class="inline-block mx-2">
          <a href="/accessibilitypolicy" class="hover:underline">Accessibility</a>
        </li>
        <li class="inline-block mx-2">© 2024 Social Media App</li>
      </ul>
    </footer>
  </div>
</template>

<script setup>
import { SearchIcon } from "@heroicons/vue/outline";
const search = ref("");
const emitter = useEmitter();
const isDarkMode = ref(false);

function handleSearch() {
  useRouter().push({
    path: "/search",
    query: {
      q: search.value,
    },
  });
}

const whatsHappeningItems = ref([
  {
    title: "SpaceX",
    count: "18.8k Followers",
  },
  {
    title: "#CodingIsFun",
    count: "8.8k Followers",
  },
  {
    title: "#artforall",
    count: "1.8k Followers",
  },
]);

const whoToFollowItems = ref([
  {
    name: "Theodore Roosevelt",
    handle: "@TheodoreRoosevelt",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "George Washington",
    handle: "@GeorgeWashington",
    image: "https://picsum.photos/200/200",
  },
  {
    name: "Abraham Lincoln",
    handle: "@AbrahamLincoln",
    image: "https://picsum.photos/200/200",
  },
]);

function handleToggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  emitter.$emit("toggleDarkMode");
}

const darkModeText = computed(() => {
  return isDarkMode.value ? "Dark mode" : "Light mode";
});
</script>
