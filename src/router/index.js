import AttractionMain from '@/components/AttractionMain.vue';
import MainPageView from '@/views/MainPageView.vue';

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
      component: AttractionMain,
    }

  ]
})

export default router
