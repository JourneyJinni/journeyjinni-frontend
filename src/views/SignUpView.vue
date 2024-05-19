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
            <label for="username" class="form-label">이름 : </label>
            <input v-model="form.username" type="text" class="form-control" placeholder="이름..." />
          </div>
          <div class="mb-3">
            <label for="userid" class="form-label">아이디 : </label>
            <input v-model="form.userid" type="text" class="form-control" placeholder="아이디..." />
            <button type="button" class="btn btn-outline-secondary mt-2" @click="checkUserId">아이디 중복 확인</button>
            <div v-if="useridCheckStatus === 'available'" class="text-success">사용 가능한 아이디입니다.</div>
            <div v-if="useridCheckStatus === 'unavailable'" class="text-danger">이미 사용 중인 아이디입니다.</div>
          </div>
          <div class="mb-3">
            <label for="userpwd" class="form-label">비밀번호 : </label>
            <input v-model="form.userpwd" type="password" class="form-control" placeholder="비밀번호..." />
          </div>
          <div class="mb-3">
            <label for="pwdcheck" class="form-label">비밀번호확인 : </label>
            <input v-model="form.pwdcheck" type="password" class="form-control" id="pwdcheck" placeholder="비밀번호확인..." />
            <div v-if="!form.passwordsMatch" class="text-danger">비밀번호가 일치하지 않습니다.</div>
          </div>
          <div class="mb-3">
            <label for="emailid" class="form-label">이메일 : </label>
            <div class="input-group">
              <input v-model="form.emailid" type="text" class="form-control" placeholder="이메일아이디" />
              <span class="input-group-text">@</span>
              <select v-model="form.selectedDomain" class="form-select" aria-label="이메일 도메인 선택">
                <option selected>선택</option>
                <option value="ssafy.com">싸피</option>
                <option value="google.com">구글</option>
                <option value="naver.com">네이버</option>
                <option value="kakao.com">카카오</option>
              </select>
            </div>
          </div>
          <div class="col-auto text-center">
            <button type="button" class="btn btn-outline-primary mb-3">회원가입</button>
            <button type="button" class="btn btn-outline-success ms-1 mb-3" @click="resetForm">초기화</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import axios from 'axios';

const form = reactive({
  username: '',
  userid: '',
  userpwd: '',
  pwdcheck: '',
  emailid: '',
  selectedDomain: '선택',
  passwordsMatch: true
});

const useridCheckStatus = ref('');

watch(() => [form.userpwd, form.pwdcheck], () => {
  form.passwordsMatch = form.userpwd === form.pwdcheck;
});

const checkUserId = async () => {
  try {
    const response = await axios.post('/api/checkUserId', { userid: form.userid });
    if (response.data.available) {
      useridCheckStatus.value = 'available';
    } else {
      useridCheckStatus.value = 'unavailable';
    }
  } catch (error) {
    console.error('아이디 중복 확인 중 오류가 발생했습니다:', error);
  }
};

const resetForm = () => {
  form.username = '';
  form.userid = '';
  form.userpwd = '';
  form.pwdcheck = '';
  form.emailid = '';
  form.selectedDomain = '선택';
  form.passwordsMatch = true;
  useridCheckStatus.value = '';
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
