import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/Login.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/home/Home.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("../views/not_found/NotFound.vue"),
    },
  ],
});
router.beforeEach((to, from) => {
  const token = window.localStorage.getItem("token");
  if (to.path.startsWith("/home") && !token) {
    return {
      path: "/login",
    };
  }
});
export default router;
