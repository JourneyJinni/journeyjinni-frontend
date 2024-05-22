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
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <!-- 스타일 향상을 위해 card 클래스 추가 -->
        <div class="card">
          <!-- 스타일 향상을 위해 card-header 클래스 추가 -->
          <div class="card-header card-header-primary">
            <!-- 스타일 향상을 위해 card-title 클래스 추가 -->
            <h2 class="card-title text-center title-emphasis font-weight-bold">
              <!-- 스타일 향상을 위해 sky 클래스 추가 -->
              글보기
            </h2>
          </div>
          <!-- 스타일 향상을 위해 card-body 클래스 추가 -->
          <div class="card-body">
            <div class="col-lg-10 text-start">
              <div class="row my-2">
                <!-- 스타일 향상을 위해 text-primary 클래스 추가 -->
                <h2>{{ article.articleNo }}. {{ article.subject }}</h2>
              </div>
              <div class="row">
                <div class="col-md-8">
                  <div class="clearfix align-content-center">
                    <!-- 스타일 향상을 위해 bg-light 클래스 추가 -->
                    <img
                        class="avatar me-2 float-md-start bg-light p-2"
                        src="https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg"
                    />
                    <!-- 스타일 향상을 위해 mb-0 클래스 추가 -->
                    <p class="mb-0">{{ article.userName }}</p>
                  </div>
                </div>
                <!-- 스타일 향상을 위해 mb-3 클래스 추가 -->
                <div class="divider mb-3"></div>
                <div class="text-secondary">
                  {{ article.content }}
                </div>
                <!-- 스타일 향상을 위해 mt-3 클래스 추가 -->
                <div class="divider mt-3 mb-3"></div>
                <div class="d-flex justify-content-end">
                  <!-- 스타일 향상을 위해 margin 클래스 추가 -->
                  <button type="button" class="btn btn-primary mb-3 me-1" @click="moveList">
                    글목록
                  </button>
                  <!-- 스타일 향상을 위해 margin 클래스 추가 -->
                  <button type="button" class="btn btn-success mb-3 me-1" @click="moveModify">
                    글수정
                  </button>
                  <!-- 스타일 향상을 위해 margin 클래스 추가 -->
                  <button type="button" class="btn btn-danger mb-3" @click="onDeleteArticle">
                    글삭제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
/* Material Dashboard Card Style */
.card {
  margin-bottom: 2rem;
  border: 0;
  border-radius: .375rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, .15);
}

.card-header {
  padding: .75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  border-bottom: 1px solid rgba(0, 0, 0, .125);
}

.card-title {
  margin-bottom: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.title-emphasis {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

</style>
