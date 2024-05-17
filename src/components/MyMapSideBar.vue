<template>
  <div id="app">
    <button class="btn btn-primary" @click="toggleSidebar">Toggle Sidebar</button>

    <div id="sidebar" :class="{'active': isSidebarVisible}">
      <div class="sidebar-header">
        <h5>Sidebar</h5>
        <button class="btn btn-link" @click="showModal">+</button>
      </div>
      <p>Sidebar content goes here.</p>
    </div>

    <!-- 모달 -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal Title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Modal content goes here.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarVisible = ref(false);

function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value;
}

function showModal() {
  const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
  modal.show();
}
</script>

<style>
#app {
  padding: 20px;
}

#sidebar {
  position: fixed;
  right: -250px;
  top: 100px; /* Adjust based on navbar height */
  height: calc(100% - 100px); /* Adjust based on navbar height */
  width: 250px;
  background-color: #f8f9fa;
  border-left: 1px solid #dee2e6;
  padding: 20px;
  transition: right 0.3s;
  z-index: 1050; /* Ensure it is above other content but below navbar */
}

#sidebar.active {
  right: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-close {
  font-size: 1.25rem;
  background: none;
  border: none;
}
</style>
