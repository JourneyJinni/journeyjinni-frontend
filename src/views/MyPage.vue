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
            <input type="text" class="form-control" :value="`${userInfo.email_id}@${userInfo.email_domain}`" :disabled="!isEmailEditMode" />
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
  const userInfo = memberStore.userInfo;
  
  let userName = userInfo.user_name;
  const isEditMode = ref(false);
  const isNameEditMode = ref(false); // 이름 수정 가능 여부
  const isEmailEditMode = ref(false); // 이메일 수정 가능 여부
  
  const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value;
    if (!isEditMode.value) {
      // 수정된 회원 정보를 JSON 형식으로 구성
      const updatedUserInfo = {
        email_id: userInfo.email_id,
        email_domain: userInfo.email_domain,
        // 필요한 다른 정보들도 포함시키세요
      };
    }
  };
  </script>
  
  <style scoped>
  
  </style>
  