<script setup>
import {reactive, ref, watch} from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { useMenuStore } from "@/stores/menu";
import {checkId} from "@/api/user.js";

const router = useRouter();
const memberStore = useMemberStore();
const { isLogin, isLoginError } = storeToRefs(memberStore);
const { userLogin, getUserInfo } = memberStore;
const { changeMenuState } = useMenuStore();
const { userSignUp } = memberStore;
const loginUser = ref({
  user_id: "",
  user_password: "",
});

const isRightPanelActive = ref(false);

const login = async () => {
  await userLogin(loginUser.value);
  let token = sessionStorage.getItem("accessToken");
  console.log(token);
  console.log("isLogin: " + isLogin.value);
  if (isLogin.value) {
    getUserInfo(token);
    changeMenuState();
    router.push('/').then(() => {
      location.reload();
    });

  }
};

const togglePanel = () => {
  isRightPanelActive.value = !isRightPanelActive.value;
};
// form 상태 변수 설정
const form = reactive({
  user_name: '',
  user_id: '',
  user_password: '',
  pwdcheck: '',
  email_id: '',
  email_domain: '선택',
  passwordsMatch: true
});

// 추가 상태 변수
const useridCheckStatus = ref('');
const isUserIdChecked = ref(false);

watch(() => [form.user_password, form.pwdcheck], () => {
  form.passwordsMatch = form.user_password === form.pwdcheck;
});

// 아이디 중복 체크 axios
const checkUserid = async () => {
  console.log("userId : ", form.user_id);
  if (!/^[a-zA-Z0-9]+$/.test(form.user_id)) {
    console.error('아이디는 영어 대문자, 소문자, 숫자만 가능합니다.');
    useridCheckStatus.value = 'invalid';
    return;
  }

  try {
    await checkId(form.user_id,
        (response) => {
          if (response.data.success) {
            console.log("true");
            useridCheckStatus.value = 'available';
            isUserIdChecked.value = true; // 아이디 중복 확인 완료 상태 설정
          } else {
            useridCheckStatus.value = 'unavailable';
          }
        }
    );
  } catch (error) {
    console.error('아이디 중복 확인 중 오류가 발생했습니다:', error);
  }
};

const resetForm = () => {
  form.user_name = '';
  form.user_id = '';
  form.user_password = '';
  form.pwdcheck = '';
  form.email_id = '';
  form.email_domain = '선택';
  form.passwordsMatch = true;
  useridCheckStatus.value = '';
  isUserIdChecked.value = false; // 초기화 시 아이디 중복 확인 상태도 초기화
};
</script>

<template>
  <div class="page-container">
    <div class="auth-container">
      <div :class="['container', { 'right-panel-active': isRightPanelActive }]">
        <!-- Sign In -->
        <div class="container__form container--signin">
          <form class="form" id="form2" @submit.prevent="login">
            <h2 class="form__title">로그인</h2>
            <div class="form-check mb-3 float-end">
            </div>
            <div class="mb-3 text-start">
              <label for="userid" class="form-label">아이디: </label>
              <input
                  type="text"
                  class="form-control"
                  v-model="loginUser.user_id"
                  placeholder="아이디..."
              />
            </div>
            <div class="mb-3 text-start">
              <label for="userpwd" class="form-label">비밀번호: </label>
              <input
                  type="password"
                  class="form-control"
                  v-model="loginUser.user_password"
                  @keyup.enter="login"
                  placeholder="비밀번호..."
              />
            </div>
            <div class="mb-3 text-start" v-if="isLoginError === true">
              <div class="alert alert-danger" role="alert">
                아이디와 비밀번호를 다시 확인하세요.
              </div>
            </div>
            <div class="col-auto text-center">
              <button type="submit" class="btn" @click="login">
                로그인
              </button>
              <button type="button" class="btn" @click="togglePanel">Sign Up</button>
            </div>
          </form>

        </div>
        <!-- Sign Up -->
        <div class="container__form container--signup">
            <div class="row justify-content-center">
              <div class="col-lg-10">
              </div>
              <div class="col-lg-10 text-start">
                <form @submit.prevent="userSignUp(form)">
                  <h2 class="form__title">회원 가입</h2>
                  <div class="mb-3">
                    <label for="user_name" class="form-label">이름 : </label>
                    <input v-model="form.user_name" type="text" class="form-control" placeholder="이름..." />
                  </div>
                  <div class="mb-3">
                    <label for="user_id" class="form-label">아이디 : </label>
                    <!-- 아이디 입력 필드 비활성화는 :disabled 속성을 통해 제어 -->
                    <input v-model="form.user_id" :disabled="isUserIdChecked" type="text" class="form-control" placeholder="아이디..." />
                    <button type="button" class="btn btn-outline-secondary mt-2" @click="checkUserid" :disabled="isUserIdChecked">아이디 중복 확인</button>
                    <div v-if="useridCheckStatus === 'available'" class="text-success">사용 가능한 아이디입니다.</div>
                    <div v-if="useridCheckStatus === 'unavailable'" class="text-danger">사용 불가능한 아이디입니다.</div>
                    <div v-if="useridCheckStatus === 'invalid'" class="text-danger">아이디는 영어 대문자, 소문자, 숫자만 가능합니다.</div>
                  </div>
                  <div class="mb-3">
                    <label for="user_password" class="form-label">비밀번호 : </label>
                    <input v-model="form.user_password" type="password" class="form-control" placeholder="비밀번호..." />
                  </div>
                  <div class="mb-3">
                    <label for="pwdcheck" class="form-label">비밀번호 확인 : </label>
                    <input v-model="form.pwdcheck" type="password" class="form-control" id="pwdcheck" placeholder="비밀번호 확인..." />
                    <div v-if="!form.passwordsMatch" class="text-danger">비밀번호가 일치하지 않습니다.</div>
                  </div>
                  <div class="mb-3">
                    <label for="email_id" class="form-label">이메일 : </label>
                    <div class="input-group">
                      <input v-model="form.email_id" type="text" class="form-control" placeholder="이메일 아이디" />
                      <span class="input-group-text">@</span>
                      <select v-model="form.email_domain" class="form-select" aria-label="이메일 도메인 선택">
                        <option selected>선택</option>
                        <option value="ssafy.com">싸피</option>
                        <option value="google.com">구글</option>
                        <option value="naver.com">네이버</option>
                        <option value="kakao.com">카카오</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-auto text-center">
                    <!-- 회원가입 버튼 비활성화는 :disabled 속성을 통해 제어 -->
                    <button type="submit" class="btn1" @click = "userSignUp(form)" :disabled="!isUserIdChecked || useridCheckStatus !== 'available'">회원가입</button>
                    <button type="button" class="btn1" @click="resetForm">초기화</button>
                  </div>
                </form>
              </div>
            </div>
        </div>


        <!-- Overlay -->
        <div class="container__overlay">
          <div class="overlay">
            <div class="overlay__panel overlay--left">
              <button class="btn1 btn-outline-secondary mt-2" @click="togglePanel">Sign In</button>
            </div>
            <div class="overlay__panel overlay--right">
              <button class="btn1" @click="togglePanel">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  /* COLORS */
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;

  /* RADII */
  --button-radius: 0.7rem;

  /* SIZES */
  --max-width: 900px;
  --max-height: 600px;

  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

body {
  align-items: center;
  background-color: var(--white);
  background: url("https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;
}

.page-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
}

.auth-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form__title {
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
}


.container {
  background-color: var(--white);
  border-radius: var(--button-radius);
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
  0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  max-width: var(--max-width);
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100vh;
}

.container__form {
  height: 100%;
  position: relative;
  transition: all 0.6s ease-in-out;
  width: 50%;
  padding: 2rem;
}


.container--signin {
  left: 0;
  width: 50%;
  z-index: 2;
}
.container--signup {
  position: absolute;
  left: 100%;
  top:0;
  opacity: 0;
  width: 50%;
  z-index: 1;
}


.container.right-panel-active .container--signin {
  transform: translateX(0%);
}

.container.right-panel-active .container--signup {
  animation: show 0.6s;
  opacity: 1;
  transform: translateX(-100%);
  z-index: 5;
}


.container__overlay {
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
}

.container.right-panel-active .container__overlay {
  transform: translateX(-100%);
}

.overlay {
  background-color: var(--lightblue);
  background: url("https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  left: -100%;
  position: absolute;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 200%;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay__panel {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  width: 50%;
}

.overlay--left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay--left {
  transform: translateX(0);
}

.overlay--right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay--right {
  transform: translateX(20%);
}

.btn1 {
  background-color: var(--blue);
  background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
  border-radius: 20px;
  border: 1px solid var(--blue);
  color: var(--white);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}


.form > .btn1 {
  margin-top: 1.5rem;
}

.btn1:active {
  transform: scale(0.95);
}

.btn1:focus {
  outline: none;
}

button:disabled {
  cursor: default;
  opacity: 0.5;
  transform: none;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
</style>
