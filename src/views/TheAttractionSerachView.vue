<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-12">
        <AttractionByCityAndCategory />
      </div>

      <div class="col-md-12">
        <AttractionListItem/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import AttractionByCityAndCategory from "@/components/attraction/AttractionByCityAndCategory.vue";
import { useAttractionStore } from "@/stores/Attraction.js";
import AttractionListItem from "@/components/attraction/AttractionListItem.vue";

const { searchedList } = useAttractionStore();

watch(searchedList, () => {
});
</script>

<style scoped>
</style>
