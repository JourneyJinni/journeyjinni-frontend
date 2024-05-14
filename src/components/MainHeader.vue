<template>
    <nav class="navbar navbar-expand-sm shadow bg-light navbar-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand text-primary fw-bold" href="/">
          <img src="#" 
          alt="Logo" 
          width="60" 
          class="d-inline-block">
          
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
        

          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link :to="{name : board}"  class="nav-link">공지사항</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name : 'attraction'}" class="nav-link">관광지 검색</router-link>
            </li>
          </ul>


          <ul class="navbar-nav ms-auto me-2" id="logout-nav">
            <li class="nav-item">
              <router-link :to="{name : 'login'}" class="nav-link">로그인</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#signupModal">회원가입</a>
            </li>
          </ul>

          <!-- <ul class="navbar-nav ms-auto me-2" id="login-nav">
          <li class="nav-item">
              <a class="nav-link" href="#">님 환영합니다.</a>
              
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" id="logout">로그아웃</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">마이페이지</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">내 정보</a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" id="myInfo">확인/수정</a></li>
                <li><a class="dropdown-item text-danger" href="#" id="del_user">회원 탈퇴</a></li>
              </ul>
            </li>
          </ul> -->

        </div>
      </div>
    </nav>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  BNavbar,
  BNavbarBrand,
  BForm,
  BFormInput,
  BButton,
  BNavbarNav,
  BNavItem,
} from 'bootstrap-vue-next';

const searchQuery = ref('');
const router = useRouter();

function goToMainPage() {
  router.push('/'); // 메인 페이지로 이동
}

function goToLogin() {
  router.push('/login'); // 로그인 페이지로 이동
}

function goToSignup() {
  router.push('/signup'); // 회원가입 페이지로 이동
}

function onSearch() {
  console.log('Search:', searchQuery.value); // 검색 로직
}
</script>

<style scoped>
.logo {
  height: 40px;
  margin-right: 20px; /* 로고 오른쪽 마진 */
}

.bg-white {
  padding-left: 20px; /* 왼쪽 마진 */
  padding-right: 20px; /* 오른쪽 마진 */
}

.search-form {
  margin-right: auto; /* 다른 요소를 오른쪽 끝으로 밀기 위해 사용 */
}

.b-form-input {
  margin-right: 10px; /* 검색 버튼과 검색창 간의 간격 */
}
</style>
