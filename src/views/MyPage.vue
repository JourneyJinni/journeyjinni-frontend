<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="orange">마이페이지</mark>
        </h2>
        <div class="mb-3 text-start">
          <label for="userId" class="form-label">아이디 :</label>
          <input type="text" class="form-control" :value="userInfo.user_id" disabled />
        </div>
        <div class="mb-3 text-start">
          <label for="userName" class="form-label">이름 :</label>
          <input type="text" class="form-control" v-model="userName" :disabled="!isNameEditMode" />
        </div>
        <div class="mb-3 text-start">
          <label for="email" class="form-label">이메일 :</label>
          <div class="input-group">
            <input type="text" class="form-control" v-model="emailId" :disabled="!isEmailEditMode" placeholder="이메일 아이디" />
            <span class="input-group-text">@</span>
            <input type="text" class="form-control" v-model="emailDomain" :disabled="!isEmailEditMode" placeholder="이메일 도메인" />
          </div>
        </div>
        <div class="mb-3 text-start">
          <label for="password" class="form-label">비밀번호 :</label>
          <input type="password" class="form-control" v-model="password" :disabled="!isPasswordEditMode" />
        </div>
        <div class="mb-3 text-start">
          <label for="joinDate" class="form-label">가입일 :</label>
          <input type="text" class="form-control" :value="userInfo.join_date" disabled />
        </div>
        <div class="col-auto text-center">
          <button type="button" class="btn btn-outline-primary mb-3" @click="toggleEditMode">
            {{ isEditMode ? '저장' : '수정' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMemberStore } from "@/stores/member";
import { ref } from 'vue';

const memberStore = useMemberStore();
const { userUpdate } = memberStore;
const userInfo = memberStore.userInfo;

let userName = ref(userInfo.user_name);
let emailId = ref(userInfo.email_id);
let emailDomain = ref(userInfo.email_domain);
let password = ref(userInfo.user_password);

const isEditMode = ref(false);
const isNameEditMode = ref(false); // 이름 수정 가능 여부
const isEmailEditMode = ref(false); // 이메일 수정 가능 여부
const isPasswordEditMode = ref(false); // 비밀번호 수정 가능 여부

const updateData = {
  user_id: userInfo.user_id,
  user_name: '',
  email_id: '',
  user_password: ''
};

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;

  if (isEditMode.value) {
    isNameEditMode.value = true;
    isEmailEditMode.value = true;
    isPasswordEditMode.value = true;
  } else {
    isNameEditMode.value = false;
    isEmailEditMode.value = false;
    isPasswordEditMode.value = false;

    updateData.user_name = userName.value;
    updateData.email_id = `${emailId.value}@${emailDomain.value}`;
    updateData.user_password = password.value;

    console.log("userData : ", updateData);
    userUpdate(updateData);
  }
};
</script>

<style scoped>
</style>
