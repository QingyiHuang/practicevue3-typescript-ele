import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: defineAsyncComponent(() => import('../views/login/Login.vue')),
    },
    {
      path: '/home',
      name: 'home',
      component: defineAsyncComponent(() => import('../views/home/Home.vue')),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: defineAsyncComponent(() => import('../views/not_found/NotFound.vue'))
    }
  ],
})

export default router
