<template>
  <div>
    <label class="form-label-outside font-weight-bold">지역</label>
    <div class="form-wrap form-wrap-inline">
      <div class="container">
        <div class="row">
          <div v-for="(sidoCode) in cities" :key="sidoCode" class="col-sm-2">
            <div class="form-check">
              <input class="form-check-input" style="width: 25px; height: 25px;" type="checkbox" :value="region.id" :id="'city' + region.id" name="city" v-model="selectedRegions">
              <label class="form-check-label font-weight-bold" :for="'city' + region.sidoCode">{{ region.sidoName }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <label class="form-label-outside font-weight-bold">카테고리</label>
    <div class="row">
      <div v-for="(category, index) in categories" :key="index" class="col-sm-4">
        <div class="form-check">
          <input class="form-check-input" style="width: 25px; height: 25px;" type="checkbox" :value="category.id" :id="'category' + category.id" name="category" v-model="selectedCategories">
          <label class="form-check-label font-weight-bold" :for="'category' + category.id">{{ category.name }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, props } from 'vue';

// props
const { cities, categories } = props;

// data
const selectedRegions = ref([]);
const selectedCategories = ref([]);

// watch
watch(selectedRegions, () => {
  emit('selected-regions', selectedRegions.value);
});

watch(selectedCategories, () => {
  emit('selected-categories', selectedCategories.value);
});
</script>
