import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CHAT from '/src/views/chat.vue'
import SIGNIN from '/src/views/signin.vue'
import SIGNUP from '/src/views/signup.vue'
import service from '../service/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: { name: 'CHAT' }
  },
  {
    path: '/chat',
    name: 'CHAT',
    component: CHAT,
    beforeEnter: async () => {
      const { data } = await service.getUserInfo();
      return data.code === 20000 ? '/signin' : true
    }
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