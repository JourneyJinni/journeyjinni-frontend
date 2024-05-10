<template>
    <div>
      <!-- 하위 컴포넌트에 지역과 카테고리 정보 전달 -->

      <!-- 검색 버튼 -->
      <button @click="searchResults">검색</button>
      <!-- 검색 결과 -->
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import { cityInfo } from '@/api/board';
 // import SearchResults from './SearchResults.vue'; // 하위 컴포넌트

 onMounted(() => {
  getArticleInfo();
 });

  const categories = ref([/* 초기 카테고리 데이터 */]);
  const selectedRegions = ref([]);
  const selectedCategories = ref([]);
  const results = ref([]);



const cities = ref([/* 초기 지역 데이터 */]);
const citycodes = ref([/* 초기 지역 데이터 */]);
const getArticleInfo = () => {
  cities
  cityInfo(
    ({ data }) => {
      console.log("response 객체 : " + data)
      cities.value = data;
      console.log("서버에서 정보목록 얻어오자1!!!", cities.value);
    },
    (error) => {
      console.log("error 발생! " + error);
    }
    );
};

</script>
  