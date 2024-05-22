<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card p-4">
          <h2 class="text-center mb-4"><span class="orange">마이페이지</span></h2>
          <div class="mb-3">
            <label class="form-label">아이디</label>
            <input type="text" class="form-control" :value="userInfo.user_id" disabled />
          </div>
          <div class="mb-3">
            <label class="form-label">이름</label>
            <input type="text" class="form-control" v-model="userName" :disabled="!isNameEditMode" />
          </div>
          <div class="mb-3">
            <label class="form-label">이메일</label>
            <div class="input-group">
              <input type="text" class="form-control" v-model="emailId" :disabled="!isEmailEditMode" placeholder="이메일 아이디" />
              <span class="input-group-text">@</span>
              <input type="text" class="form-control" v-model="emailDomain" :disabled="!isEmailEditMode" placeholder="이메일 도메인" />
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">비밀번호</label>
            <input type="password" class="form-control" v-model="password" :disabled="!isPasswordEditMode" />
          </div>
          <div class="mb-3">
            <label class="form-label">가입일</label>
            <input type="text" class="form-control" :value="userInfo.join_date" disabled />
          </div>
          <div class="text-center">
            <button type="button" class="btn btn-primary" @click="toggleEditMode">
              {{ isEditMode ? '저장' : '수정' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useMemberStore } from "@/stores/member";
import { ref } from 'vue';

const memberStore = useMemberStore();
const { userUpdate, getUserInfo } = memberStore;

getUserInfo(sessionStorage.getItem("accessToken"))
const userInfo = memberStore.userInfo;


console.log("마이페이지 유저 정보: " , memberStore.userInfo)
let userName = ref(memberStore.userInfo.user_name);
let emailId = ref(memberStore.userInfo.email_id);
let emailDomain = ref(memberStore.userInfo.email_domain);
let password = ref(memberStore.userInfo.user_password);

const isEditMode = ref(false);
const isNameEditMode = ref(false); // 이름 수정 가능 여부
const isEmailEditMode = ref(false); // 이메일 수정 가능 여부
const isPasswordEditMode = ref(false); // 비밀번호 수정 가능 여부

const updateData = {
  user_id: userInfo.user_id,
  user_name: '',
  email_id: '',
  emailDomain: '',
  user_password: '',
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
    updateData.email_id = emailId.value;
    updateData.emailDomain = emailDomain.value;
    updateData.user_password = password.value;

    console.log("userData : ", updateData);
    userUpdate(updateData);
  }
};
</script>

<style scoped>

.card {
  background-color: #f8f9fa; /* 카드 배경색 */
  border: none; /* 카드 테두리 없음 */
  border-radius: 15px; /* 카드 모서리 둥글게 */
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
}

.card h2 {
  color: #343a40; /* 카드 제목 색상 */
}

.form-control {
  border-color: #ced4da; /* 입력 요소 테두리 색상 */
}

.btn-primary {
  background-color: #007bff; /* 주요 버튼 배경색 */
  border-color: #007bff; /* 주요 버튼 테두리 색상 */
}

.btn-primary:hover {
  background-color: #0056b3; /* 주요 버튼 호버 배경색 */
  border-color: #0056b3; /* 주요 버튼 호버 테두리 색상 */
}
</style>
