<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listArticle } from "@/api/board.js";

import VSelect from "@/components/common/VSelect.vue";
import BoardListItem from "@/components/boards/item/BoardListItem.vue";
import VPageNavigation from "@/components/common/VPageNavigation.vue";

const router = useRouter();

const selectOption = ref([
  { text: "검색조건", value: "" },
  { text: "글번호", value: "article_no" },
  { text: "제목", value: "subject" },
  { text: "작성자아이디", value: "user_id" },
]);

const articles = ref([]);
const currentPage = ref(1);
const totalPage = ref(0);
const isLoading = ref(false);  // 로딩 상태 관리
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
});

onMounted(() => {
  getArticleList();
});

const changeKey = (val) => {
  param.value.key = val;
};

const getArticleList = () => {
  isLoading.value = true;  // 로딩 시작
  listArticle(
      param.value,
      ({ data }) => {
        articles.value = data.articles;
        currentPage.value = data.currentPage;
        totalPage.value = data.totalPageCount;
        isLoading.value = false;  // 로딩 종료
      },
      (error) => {
        console.error(error);
        isLoading.value = false;  // 로딩 종료
      }
  );
};

const onPageChange = (val) => {
  currentPage.value = val;
  param.value.pgno = val;
  getArticleList();
};

const moveWrite = () => {
  router.push({ name: "article-write" });
};

const nextPage = () => {
  if (currentPage.value < totalPage.value) {
    onPageChange(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    onPageChange(currentPage.value - 1);
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card shadow-lg">
          <div class="card-header card-header-primary">
            <h1 class="card-title text-center title-emphasis font-weight-bold"><b>글목록</b></h1>
          </div>
          <div class="card-body">

            <div v-if="isLoading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-else>
              <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table table-hover">
                  <thead class="text-primary">
                  <tr class="text-center">
                    <th scope="col">글번호</th>
                    <th scope="col">제목</th>
                    <th scope="col">작성자</th>
                    <th scope="col">조회수</th>
                    <th scope="col">작성일</th>
                  </tr>
                  </thead>
                  <tbody>
                  <BoardListItem
                      v-for="(article, index) in articles"
                      :key="article.articleNo"
                      :article="article"
                  ></BoardListItem>
                  </tbody>
                </table>
              </div>
              <div class="col-md-2 text-start">
                <button type="button" class="btn btn-primary" @click="moveWrite">
                  글쓰기
                </button>
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

.table thead th {
  border-bottom: 2px solid #dee2e6;
}

.table tbody tr:hover {
  background-color: #f5f5f5;
}

.table td,
.table th {
  vertical-align: middle;
}

.input-group .form-control {
  border-right: 0;
}

.input-group .input-group-text {
  background-color: #fff;
  border-left: 0;
}

.title-emphasis {
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
}
</style>
