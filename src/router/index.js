
import AttractionSearchView from '@/views/AttractionSearchView.vue';
import LoginView from '@/views/LoginView.vue';
import MainPageView from '@/views/MainPageView.vue';
import MyPage from '@/views/MyPage.vue';

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPageView,

    },
    {
      path: '/attraction',
      name: 'attraction',
      component: AttractionSearchView,
    }
    ,
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage
    }

  ]
})

export default router
