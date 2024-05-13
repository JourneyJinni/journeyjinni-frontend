  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    items: Array,
    selected: Array,
    label: String
  });
  
  const emits = defineEmits(['update:selected']);
  
  const toggleSelection = (itemId) => {
    const index = props.selected.indexOf(itemId);
    if (index === -1) {
      const updatedSelection = [...props.selected, itemId];
      emits('update:selected', updatedSelection);
    } else {
      const updatedSelection = props.selected.filter(id => id !== itemId);
      emits('update:selected', updatedSelection);
    }
  };
  
  const isSelected = (itemId) => {
    return props.selected.includes(itemId);
  };
  </script>
  
<template>
<div class="container-fluid mt-6" style="max-width: 25%;"> <!-- 전체적인 너비를 현재 너비의 30%로 제한합니다. -->
    <div class="col-md-12 selectedBox"> <!-- 중간 크기(md) 화면일 때 12개의 열을 차지합니다. -->
        <label for="fruit" class="mb-0"> <h3>{{ label }} </h3></label> <!-- 선택 상자의 레이블 -->
        <select id="fruit" class="form-select" v-model="selectedItem" @change="updateSelectedItem"> <!-- 폼 컨트롤을 사용하여 선택 상자를 만듭니다. -->
          <option value="" selected>항목을 선택하세요</option> <!-- 기본 선택 옵션 -->
          <option v-for="(item, index) in items" :value="item.code" :key="index">{{ item.name }}</option> <!-- 선택 상자의 항목을 반복하여 생성합니다. -->
        </select>
    </div>
</div>

  </template>
  
  
  