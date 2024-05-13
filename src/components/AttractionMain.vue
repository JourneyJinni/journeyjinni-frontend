<template>
<br><br><br>
<div class="rounded p-3 bg-light shadow d-flex align-items-center justify-content-between"> <!-- 모든 공간을 사용하면서 가로로 정렬합니다. -->
  <CheckBoxView :items="cities" v-model:selected="selectedCities" label="지역" />

  <CheckBoxView :items="categories" v-model:selected="selectedCategories" label="카테고리" />
</div>
    

    <button @click="searchResults">검색</button>
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
  cities
  cityInfo(
    ({ data }) => {
      console.log("response 객체 : " + data)
      cities.value = data;
      console.log("cities = " , cities.value);
    },
    (error) => {
      console.log("city 정보 error 발생! " + error);
    }
  );
};

const getCategory = () => {
  categoryInfo(
    ({ data }) => {
      console.log("response 객체 : " + data)
      categories.value = data;
      console.log("categories = ", categories.value);
    },
    (error) => {
      console.log("category 정보 error 발생! " + error);
    }
  );
};


const searchResults = () => {
  // 선택된 지역과 카테고리에 따른 검색 결과를 처리하는 함수
  console.log("선택된 지역:", selectedCities);
  console.log("선택된 카테고리:", selectedCategories);
  // 검색 결과를 처리하는 로직을 추가
};
</script>
