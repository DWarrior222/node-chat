import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import CHAT from '/src/views/chat.vue'
import SIGNIN from '/src/views/signin.vue'
import SIGNUP from '/src/views/signup.vue'
import service from '/src/service/index'

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
      const res = await service.getUserInfo();
      if (!res) return '/signin'
      const { data = {} } = res;
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
  history: createWebHistory('/'),
  routes
})

export default router