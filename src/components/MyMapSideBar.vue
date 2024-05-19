<script setup>
import axios from "axios";
import { onMounted, ref } from 'vue';
const myTripList = ref([]);
import { useMemberStore } from "@/stores/member"
import MyAttractionModal from "@/components/MyAttractionModal.vue";
//사이드바 토글
const isSidebarVisible = ref(false);
//유저 아이디 불러오기
const memberStore = useMemberStore()
const userId = memberStore.userInfo.user_id;

//등록할 여행 이름
const registerTripName = ref("");
//유저별 등록한 여행 불러오기
const getUserTrip = () => {
  axios.get("http://localhost/get-usertrip/" + userId)
    .then(({ data }) => {
      myTripList.value = data;
      console.log(myTripList.value);
    })
    .catch((error) => {
      console.assert(error);
    })
}
onMounted(() => {
  getUserTrip();
}) 
  


//여행 등록
const  registerTrip = async () => {
  const formData = new FormData();
  console.log(userId);
  formData.append("userId", userId);
  formData.append("tripName", registerTripName.value);
  try {
    const response = await axios.post('http://localhost/register-trip', formData, {
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
  registerTripName.value = ""
  getUserTrip();
}

//사이드바 토글 메서드
function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value;
}
//여행지(관광지) 등록
const registerAttraction = async () => {
  
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("tripName", registerTripName.value);

  try {
    const response = await axios.post('http://localhost/register-attraction', formData, {
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
  registerTripName.value = ""
  getUserTrip();
}
</script>



<template>
  <div id="app">
    <button class="btn btn-primary" @click="toggleSidebar">Toggle Sidebar</button>

    <div id="sidebar" :class="{'active': isSidebarVisible}">
      <div class="sidebar-header">
        <h5>나의 여행</h5>
        <button class="btn btn-link" data-bs-toggle="modal" data-bs-target="#addTripModal">+</button>
      </div>
      <ul class="list-unstyled components">
        <li v-for="trip in myTripList" :key="trip.trip_id">
          <p> {{trip.trip_name}}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="trip.trip_id">
          여행지 추가
          </button>
          <MyAttractionModal :trip-id="trip.trip_id"/>
        </li>
      </ul>
    </div>

    <!-- 여행 추가 모달 -->
  <div class="modal fade" id="addTripModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">여행 등록</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label>여행 이름: </label>
          <input type="text" v-model="registerTripName">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="registerTrip">등록</button>
        </div>
      </div>
    </div>
  </div>


</div>

  
</template>






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


#sidebar ul.components {
      padding: 20px 0;
      border-bottom: 1px solid #47748b;
    }

    #sidebar ul p {
      padding: 10px;
      color: #000;
    }

    #sidebar ul li a {
      padding: 10px;
      font-size: 1.1em;
      display: block;
      color: #d1d1d1;
      transition: 0.3s;
    }

    #sidebar ul li a:hover {
      color: #fff;
      background: #6c757d;
    }

    #sidebar ul li.active > a {
      background: #6c757d;
      color: #fff;
    }
</style>
