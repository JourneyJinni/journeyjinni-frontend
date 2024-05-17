<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { registArticle, getModifyArticle, modifyArticle } from "@/api/board";
import { useMemberStore } from "@/stores/member";

// Vuex store에서 사용자 정보를 가져옴
const memberStore = useMemberStore();
const { userInfo, getUserInfo } = memberStore;

// 현재 사용자 정보를 저장할 ref
const user = ref(null);

const router = useRouter();
const route = useRoute();

const props = defineProps({ type: String });

const isUseId = ref(false);

const article = ref({
  articleNo: 0,
  subject: "",
  content: "",
  userId: "",
  userName: "",
  hit: 0,
  registerTime: "",
});

// 사용자 정보를 가져오고 article에 설정
async function fetchUserInfo() {
  getUserInfo(); 
  console.log("uservalueid ", userInfo.user_id);
  article.value.userId = userInfo.user_id;
}

onMounted(() => {
  fetchUserInfo();

  if (props.type === "modify") {
    const { articleno } = route.params;
    getModifyArticle(
      articleno,
      ({ data }) => {
        article.value = data;
        isUseId.value = true;
      },
      (error) => {
        console.error(error);
      }
    );
    isUseId.value = true;
  }
});

const subjectErrMsg = ref("");
const contentErrMsg = ref("");
watch(
  () => article.value.subject,
  (value) => {
    const len = value.length;
    if (len == 0 || len > 30) {
      subjectErrMsg.value = "제목을 확인해 주세요!!!";
    } else {
      subjectErrMsg.value = "";
    }
  },
  { immediate: true }
);
watch(
  () => article.value.content,
  (value) => {
    const len = value.length;
    if (len == 0 || len > 500) {
      contentErrMsg.value = "내용을 확인해 주세요!!!";
    } else {
      contentErrMsg.value = "";
    }
  },
  { immediate: true }
);

function onSubmit() {
  if (subjectErrMsg.value) {
    alert(subjectErrMsg.value);
  } else if (contentErrMsg.value) {
    alert(contentErrMsg.value);
  } else {
    if (props.type === "regist") {
      writeArticle();
    } else {
      updateArticle();
    }
  }
}

function writeArticle() {
  registArticle(
    article.value,
    (response) => {
      let msg = "글등록 처리시 문제 발생했습니다.";
      if (response.status == 201) msg = "글등록이 완료되었습니다.";
      alert(msg);
      moveList();
    },
    (error) => {
      console.error(error);
    }
  );
}

function updateArticle() {
  const data = {
    article: article,
    user_id: userInfo.user_id
  }
  modifyArticle(
    data.value,
    (response) => {
      let msg = "글수정 처리시 문제 발생했습니다.";
      if (response.status == 200) msg = "글정보 수정이 완료되었습니다.";
      else if (response.status == 401) msg = "작성자만 수정 가능합니다.";
      alert(msg);
      moveList();
    },
    (error) => {
      console.error(error);
    }
  );
}

function moveList() {
  router.push({ name: "article-list" });
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="userid" class="form-label">작성자 ID : </label>
      <input
        type="text"
        class="form-control"
        v-model="article.userId"
        :disabled="true"
        placeholder="작성자ID..."
      />
    </div>
    <div class="mb-3">
      <label for="subject" class="form-label">제목 : </label>
      <input type="text" class="form-control" v-model="article.subject" placeholder="제목..." />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용 : </label>
      <textarea class="form-control" v-model="article.content" rows="10"></textarea>
    </div>
    <div class="col-auto text-center">
      <button type="submit" class="btn btn-outline-primary mb-3" v-if="type === 'regist'">
        글작성
      </button>
      <button type="submit" class="btn btn-outline-success mb-3" v-else>글수정</button>
      <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="moveList">
        목록으로이동...
      </button>
    </div>
  </form>
</template>

<style scoped></style>
