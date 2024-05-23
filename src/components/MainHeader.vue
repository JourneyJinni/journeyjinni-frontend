<template>
  <nav class="navbar navbar-expand-sm shadow bg-light navbar-light sticky-top custom-navbar">
    <div class="container-fluid">
      <a class="navbar-brand text-primary fw-bold" href="/">
        <img src="@/assets/logo.png" 
             alt="Logo" 
             width="70"
             height='50'
             class="d-inline-block">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{ name: 'board' }" class="nav-link">게시판</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'attraction' }" class="nav-link">관광지 검색</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'tripboard' }" class="nav-link">여행 코스</router-link>
          </li>
        </ul>
        <div class="ms-auto">
          <div v-if="token">
            <ul class="navbar-nav" id="login-nav">
              <li class="nav-item">
                <router-link :to="{ name: 'mypage' }" class="nav-link">{{ name }}님 환영합니다.</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" @click="userLogout">로그아웃</a>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'my-map' }" class="nav-link">나의 여행지도</router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'mypage' }" class="nav-link">마이페이지</router-link>
              </li>
            </ul>
          </div>
          <div v-else>
            <ul class="navbar-nav" id="logout-nav">
              <li class="nav-item">
                <router-link :to="{ name: 'login' }" class="nav-link">로그인/로그아웃</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {computed, watch} from 'vue';
import { useMemberStore } from "@/stores/member"

const memberStore = useMemberStore();
const { userLogout, deleteUser } = memberStore;

const token = computed(() => sessionStorage.getItem("accessToken") !== null && memberStore.isValidToken);

watch(() => token, () => {
  console.log("token watch!");
});

const name = computed(() => memberStore.username);
const user_id = computed(() => memberStore.userId);
</script>

<style scoped>
.custom-navbar {
  padding: 0.5rem 1rem; /* 상단과 하단 패딩 조정 */
}

.navbar-brand img {
  max-height: 40px; /* 로고의 최대 높이 조정 */
}

.nav-link {
  padding: 0.5rem; /* 네비게이션 링크의 패딩 조정 */
}

.navbar-nav .nav-item {
  margin: 0 0.5rem; /* 네비게이션 아이템 간의 간격 조정 */
}
</style>
