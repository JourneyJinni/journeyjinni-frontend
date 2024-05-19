
import AttractionSearchView from '@/views/AttractionSearchView.vue';
import LoginView from '@/views/LoginView.vue';
import MainPageView from '@/views/MainPageView.vue';
import MyMapView from '@/views/MyMapView.vue';
import MyPage from '@/views/MyPage.vue';
import SignUpView from '@/views/SignUpView.vue';
import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from 'vue-router';

import { useMemberStore } from "@/stores/member";
const onlyAuthUser = async (to, from, next) => {
  console.log("onlyAuthUser!!!")
  const memberStore = useMemberStore();
  const { userInfo, isValidToken } = storeToRefs(memberStore);
  const { getUserInfo } = memberStore;

  let token = sessionStorage.getItem("accessToken");

  if (userInfo.value != null && token) {
    await getUserInfo(token);
  }
  if (!isValidToken.value || userInfo.value === null) {
    next({ name: "user-login" });
  } else {
    next();
  }
};


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
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/mymap',
      name: 'my-map',
      component: MyMapView,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage
    },
    {
      path: "/board",
      name: "board",
      component: () => import("@/views/TheBoardView.vue"),
      redirect: { name: "article-list" },
      children: [
        {
          path: "list",
          name: "article-list",
          component: () => import("@/components/boards/BoardList.vue"),
        },
        {
          path: "view/:articleno",
          name: "article-view",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/boards/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "article-write",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/boards/BoardWrite.vue"),
        },
        {
          path: "modify/:articleno",
          name: "article-modify",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/boards/BoardModify.vue"),
        },
      ],
    },

  ]
})

export default router
