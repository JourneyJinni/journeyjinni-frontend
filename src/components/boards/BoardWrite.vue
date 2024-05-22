<script setup>
import BoardFormItem from "./item/BoardFormItem.vue";
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card shadow-lg">
          <div class="card-header card-header-primary">
            <h2 class="card-title text-center title-emphasis font-weight-bold">
              글쓰기
            </h2>
          </div>
          <div class="card-body row justify-content-center">
            <div class="col-lg-10 text-start">
              <BoardFormItem type="regist" />
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
