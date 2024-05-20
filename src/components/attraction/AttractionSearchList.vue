
<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-6">
        <AttractionSearchList :searchedList="searchedList" />
      </div>
    </div>
</div>
</template>

<script setup>

  const props = defineProps({
    sido: String,
    gugun: String,
    attractionType: String
  });

  import { ref, onMounted, watch } from "vue";
  import { getAttractionListByFilter } from "@/api/attraction.js";
  import AttractionSearchList from '@/components/attraction/AttractionSearchList.vue';

  const searchedList = ref([]);

  const filterList = () => {
  getAttractionListByFilter(
      props,
      (response) => {
        searchedList.value = response;
        console.log(searchedList.value);
      },
      (error) => {
        console.error(error);
      }
  );
};

  onMounted(() => {
  filterList();
});

  watch(() => attractionStore.searchedList, () => {
    // 아무 동작 없이도 재 렌더링이 발생합니다.
  });
</script>

<style scoped>
</style>
