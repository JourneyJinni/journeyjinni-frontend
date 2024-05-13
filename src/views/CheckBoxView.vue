<template>
    <div class="container-fluid mt-6" style="max-width: 25%;">
      <div class="col-md-12 selectedBox">
        <label for="fruit" class="mb-0"><h3>{{ label }}</h3></label>
        <select id="fruit" class="form-select" v-model="selectedItem" @change="updateSelectedItem">
          <option value="" selected>항목을 선택하세요</option>
          <option v-for="(item, index) in items" :value="item.code" :key="index">{{ item.name }}</option>
        </select>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref } from 'vue';
  
  const props = defineProps({
    items: Array,
    selected: Array,
    label: String
  });
  
  const emits = defineEmits(['updateSelectedItem']);
  const selectedItem = ref()
  const updateSelectedItem = () => {
    //const selectedItem = event.target.value;
    emits('updateSelectedItem', selectedItem.value);
  };
  </script>
  