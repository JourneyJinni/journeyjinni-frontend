<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { detailArticle, deleteArticle, validateUserById } from "@/api/board";
import { useMemberStore } from "@/stores/member";
const route = useRoute();
const router = useRouter();

// const articleno = ref(route.params.articleno);
const { articleno } = route.params;
const memberStore = useMemberStore();
const { userInfo, getUserInfo } = memberStore;
const article = ref({});

onMounted(() => {
  getArticle();
});

const getArticle = () => {
  detailArticle(
    articleno,
    ({ data }) => {
      article.value = data;
    },
    (error) => {
      console.error(error);
    }
  );
};

const validateUser = (successCallback) => {
  getUserInfo();
  const data = {
    author: article.value.userId,
    user_id: userInfo.user_id
  };
  console.log("article", article.value);
  console.log("data", data);
  validateUserById(
    data,
    (response) => {
      if (response.status === 200) {
        console.log("User validation successful. Proceeding with the next logic.");
        successCallback();
      } else {
        console.log("User validation failed. Error code:", response.status);
        alert("권한이 없습니다.")
      }
    },
    (error) => {
      console.log("Request failed with error:", error);
      alert("권한이 없습니다.")
    }
  );
}

function moveList() {
  router.push({ name: "article-list" });
}

function moveModify() {
  validateUser(() => {
    router.push({ name: "article-modify", params: { articleno } });
  });
}

function onDeleteArticle() {
  validateUser(() => {
    deleteArticle(
      articleno,
      (response) => {
        if (response.status === 200) {
          alert("게시글이 삭제되었습니다.")
          moveList();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  });
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="sky">글보기</mark>
        </h2>
      </div>
      <div class="col-lg-10 text-start">
        <div class="row my-2">
          <h2 class="text-secondary px-5">{{ article.articleNo }}. {{ article.subject }}</h2>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="clearfix align-content-center">
              <img
                class="avatar me-2 float-md-start bg-light p-2"
                src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
              />
              <P>{{  article.userName }}</P>
            </div>
          </div>
          <div class="divider mb-3"></div>
          <div class="text-secondary">
            {{ article.content }}
          </div>
          <div class="divider mt-3 mb-3"></div>
          <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-primary mb-3" @click="moveList">
              글목록
            </button>
            <button type="button" class="btn btn-outline-success mb-3 ms-1" @click="moveModify">
              글수정
            </button>
            <button type="button" class="btn btn-outline-danger mb-3 ms-1" @click="onDeleteArticle">
              글삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
