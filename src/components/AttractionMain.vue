<template>
  <br><br><br>
  <div class="rounded p-3 bg-light shadow d-flex align-items-center justify-content-between">
    <!-- CheckBoxView 컴포넌트에서 선택된 항목을 부모 컴포넌트로 emit -->
    <CheckBoxView :items="cities" v-model:selected="selectedCities" label="지역" @update-selected-item="updateSelectedCities" />

    <CheckBoxView :items="categories" v-model:selected="selectedCategories" label="카테고리" @update-selected-item="updateSelectedCategories" />

    <button @click="searchResults">검색</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { cityInfo, categoryInfo } from '@/api/board';
import CheckBoxView from '@/views/CheckBoxView.vue';

onMounted(() => {
  getCity();
  getCategory();
});

const cities = ref([]);
const categories = ref([]);
const selectedCities = ref([]);
const selectedCategories = ref([]);

const getCity = () => {
  cityInfo(
    ({ data }) => {
      cities.value = data;
    },
    (error) => {
      console.log("city 정보 error 발생! " + error);
    }
  );
};

const getCategory = () => {
  categoryInfo(
    ({ data }) => {
      categories.value = data;
    },
    (error) => {
      console.log("category 정보 error 발생! " + error);
    }
  );
};

const updateSelectedCities = (selected) => {
  selectedCities.value = selected;
};

const updateSelectedCategories = (selected) => {
  selectedCategories.value = selected;
};

const searchResults = () => {
  // 선택된 지역과 카테고리에 따른 검색 결과를 처리하는 함수
  console.log("선택된 지역:", selectedCities.value);
  console.log("선택된 카테고리:", selectedCategories.value);
  // 검색 결과를 처리하는 로직을 추가
};
</script>
