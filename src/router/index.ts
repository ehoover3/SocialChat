// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

//  <Home :user="user" class="w-full" />

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: (route: any) => ({
      user: route.query.user || null,
    }),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/privacypolicy",
    name: "PrivacyPolicy",
    component: () => import("@/views/PrivacyPolicy.vue"),
  },
  {
    path: "/cookiepolicy",
    name: "CookiePolicy",
    component: () => import("@/views/CookiePolicy.vue"),
  },
  {
    path: "/termsofservice",
    name: "TermsOfService",
    component: () => import("@/views/TermsOfService.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
