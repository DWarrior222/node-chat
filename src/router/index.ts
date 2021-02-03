import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CHAT from '/src/views/chat.vue'
import SIGNIN from '/src/views/signin.vue'
import SIGNUP from '/src/views/signup.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'CHAT' }
  },
  {
    path: '/chat',
    name: 'CHAT',
    component: CHAT
  },
  {
    path: '/signin',
    name: 'SIGNIN',
    component: SIGNIN
  },
  {
    path: '/signup',
    name: 'SIGNUP',
    component: SIGNUP
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router