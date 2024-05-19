<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="orange">회원가입</mark>
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <form>
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
            <button type="button" class="btn btn-outline-primary mb-3" @click="userSignUp(form)" :disabled="!isUserIdChecked || useridCheckStatus !== 'available'">회원가입</button>
            <button type="button" class="btn btn-outline-success ms-1 mb-3" @click="resetForm">초기화</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { checkId } from "@/api/user.js";
import { useMemberStore } from "@/stores/member.js";

const memberStore = useMemberStore();
const { userSignUp } = memberStore;

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

<style scoped>
.text-danger {
  color: red;
}
.text-success {
  color: green;
}
</style>
