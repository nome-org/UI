import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/Home.vue"),
  },
  {
    path: "/member",
    name: "Member",
    component: () => import("@/components/Member.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
