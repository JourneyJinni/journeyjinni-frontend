<script setup>
import axios from "axios";
import { onMounted, ref, watch } from 'vue';
import { useMemberStore } from "@/stores/member"
import MyAttractionModal from "@/components/main/MyAttractionModal.vue";
import MyTripSettingModal from '@/components/MyTripSettingModal.vue';
import MyAttractionSettingModal from '@/components/MyAttractionSettingModal.vue'
import { Modal } from 'bootstrap';
const { VITE_VUE_API_URL } = import.meta.env;
//사이드바 토글
const isSidebarVisible = ref(false);
//유저 아이디 불러오기
const memberStore = useMemberStore()
const userId = memberStore.userInfo.user_id;
const currentTripId = ref();
// const modalInstance = ref(null); // 모달 인스턴스를 저장할 ref
const tripListFlags = ref([]);
const myTripList = ref([]);
const myAttractionMap = new Map();
const currentTrip = ref({});
const currentAttraction = ref({});

//등록할 여행 이름
const registerTripName = ref("");
//유저별 등록한 여행 불러오기
const getUserTrip = () => {
  axios.get(VITE_VUE_API_URL + "/get-usertrip/" + userId)
    .then(({ data }) => {
      myTripList.value = data;
      
      const flags = [];
      for (let i = 0; i < myTripList.value.length; i++){
        flags.push(false);
        getUserAttraction(myTripList.value[i].trip_id);
      }
      tripListFlags.value = flags;
      
    })
    .catch((error) => {
      console.assert(error);
    })
}

//여행별 등록한 여행지목록 가져오기
const getUserAttraction = async (tripId) => {
  axios.get(VITE_VUE_API_URL + "/get-userattraction/" + tripId)
    .then(({ data }) => {
      myAttractionMap.set(tripId, data);

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
    const response = await axios.post(VITE_VUE_API_URL + '/register-trip', formData, {
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


const emit = defineEmits(['moveToMarker','refreshAttractions'])
const moveToMarker = (attractionId) => {
    emit('moveToMarker',attractionId)
}

const refreshAttractions = () => {
  getUserTrip();
  emit('refreshAttractions');
}

const openAttractionAddModal = (tripId) => {
  currentTripId.value = tripId;
  if (currentTripId.value !== null) {
    const modalElement = document.querySelector(`#myAttractionModal`);
    const modalInstance = ref();
    if (!modalInstance.value) {
      modalInstance.value = new Modal(modalElement);
    }
    modalInstance.value.show();
  }
};

const openTripSettingModal = (trip) => {
  currentTrip.value = trip;
  if (currentTrip.value !== null) {
    const modalElement = document.querySelector(`#settingTripModal`);
    const modalInstance = ref();
    if (!modalInstance.value) {
      modalInstance.value = new Modal(modalElement);
    }
    modalInstance.value.show();
  }
};
const openAttractionSettingModal = (attraction) => {
  currentAttraction.value = attraction;
  if (currentAttraction.value !== null) {
    const modalElement = document.querySelector(`#myAttractionSettingModal`);
    const modalInstance = ref();
    if (!modalInstance.value) {
      modalInstance.value = new Modal(modalElement);
    }
    modalInstance.value.show();
  }
};
</script>



<template>
  <div id="app">
    <button class="btn btn-sm image-button" @click="toggleSidebar" v-show="!isSidebarVisible">
      <img src="@/assets/sidebar_MyMap.png" alt="Toggle Sidebar">
    </button>

    <div id="sidebar" :class="{'active': isSidebarVisible}">
      <div class="sidebar-header d-flex justify-content-between align-items-center">
        <button class="image-button-left" @click="toggleSidebar">
          <img src="@/assets/sidebar_MyMap_right.png" alt="Toggle Sidebar">
        </button>
        <h5>나의 여행</h5>
        <button class="btn btn-link" data-bs-toggle="modal" data-bs-target="#addTripModal">+</button>
      </div>
      <div class="list-group" v-for="(trip, index) in myTripList" :key="trip.trip_id">
        <button
          @click="tripListFlags[index] = !tripListFlags[index]" 
          class="list-group-item list-group-item-action"
          aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <p class="mb-1">{{ trip.trip_name }}</p>
            <div class="d-flex">
              <button class="btn btn-sm setting-button" @click.stop="openTripSettingModal(trip)">
                <img src="@/assets/settingIcon.png" alt="Setting Attraction">
              </button>
              <button class="btn btn-sm" @click.stop="openAttractionAddModal(trip.trip_id)">
                +
              </button>
            </div>
          </div>
          <div v-if="tripListFlags[index]" class="margin-5px">
            <button
              class="list-group-item list-group-item-action"
              @click.stop="moveToMarker(attraction.attraction_id)"
              v-for="attraction in myAttractionMap.get(trip.trip_id)"
              :key="attraction.attraction_id">
              <div class="d-flex w-100 justify-content-between">
                <p class="mb-1">{{ attraction.attraction_name }}</p>
                <button class="btn btn-sm setting-button" @click.stop="openAttractionSettingModal(attraction)">
                  <img src="@/assets/settingIcon.png" alt="Setting Attraction">  
                </button>
              </div>
            </button>
          </div>
        </button>
      </div>
    </div>

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
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="registerTrip">확인</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
        </div>
      </div>
    </div>
  </div>
  
  <MyAttractionModal :trip-id="currentTripId" @refresh-attractions="refreshAttractions"/>
  <MyTripSettingModal :trip="currentTrip" @refresh-attractions="refreshAttractions"/>
  <MyAttractionSettingModal :attraction="currentAttraction" @refresh-attractions="refreshAttractions"/>


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
  align-items: center;
  padding: 10px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.image-button-left {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-right: 10px;
}

.image-button-left img {
  width: 50px; /* 이미지 크기를 조절하세요 */
  height: 50px; /* 이미지 크기를 조절하세요 */
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
    .image-button {
      position: fixed;
      top: 100px;
      right: 10px;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      z-index: 1000;
    }


    .image-button img {
      width: 50px; /* 이미지의 너비 조정 */
      height: 50px; /* 이미지의 높이 조정 */
    }
    /* 이미지 버튼을 오른쪽으로 이동시킵니다. */
    .setting-button img{
      margin-left: auto; /* 자동 마진을 사용하여 오른쪽으로 이동시킵니다. */
      width: 20px; /* 이미지 크기를 조절하세요 */
      height: 20px; /* 이미지 크기를 조절하세요 */
    }
</style>
