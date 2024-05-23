
<script setup>
import {ref, onMounted, computed} from 'vue';
import { defineProps } from 'vue';
import {getTripDetails, getAttractionImages} from '@/api/Trip.js';

const props = defineProps({
  tripId: {
    type: String,
    required: true
  },
  tripName: {
    type: String,
    default: "이런 곳을 갔어요."
  }
});

const attractions = ref([]);
const selectedAttractionImages = ref([]);
let attractionName;

const fetchTripDetails = async () => {
  console.log("해당 tripDetail 정보를 가지러 감 . " , props.tripId)
  getTripDetails(
      props.tripId,
      (success) => {
        attractions.value = success.data;
        console.log("attractions : ", props.tripId)
      },(error) => {
        console.log("여행 코스들을 가져오는데 실패했습니다." , error)
      }
  );
};

const fetchImageDetail = async (attractionId, name) => {
  console.log("tripImage 정보를 가지러 감")

  attractionName = name + "의 기록";
  getAttractionImages(
      attractionId,
      (success) => {
        selectedAttractionImages.value = success.data;
        console.log(selectedAttractionImages.value);
      },(error) => {
        console.log("관광지 세부정보를 가져오는데 실패했습니다." , error)
      }
  );
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

onMounted(() => {
  fetchTripDetails();
});
</script>

<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">{{ props.tripName }}</h1>
    <div class="row">
      <!-- 관광지 리스트 -->
      <div class="col-md-4" v-for="attraction in attractions" :key="attraction.attractionId">
        <div class="card mb-3" @click="fetchImageDetail(attraction.attractionId, attraction.attractionName)">
          <div class="card-body">
            <h5 class="card-title">{{ attraction.attractionName }}</h5>
            <p class="card-text">{{ attraction.attractionDescription }}</p>
          </div>
        </div>
      </div>
    </div>

    <section class="gallery-block compact-gallery">
      <div class="container">
        <h3 class="text-center mb-4">{{ attractionName }}</h3>
        <div class="row no-gutters">
          <div v-for="image in selectedAttractionImages" :key="image.imageId" class="col-md-6 col-lg-4 item zoom-on-hover">
            <a class="lightbox" :href="'data:image/jpeg;base64,' + image.image">
              <div class="image-container">
                <img class="img-fluid image" :src="'data:image/jpeg;base64,' + image.image">
                <span class="description">
                  <span class="description-heading">{{ image.imageDescription }}</span>
                  <br>
                  <span class="description-body">{{ formatDate(image.date) }}</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<style scoped>
.card {
  cursor: pointer;
}

.card:hover {
  background-color: #f8f9fa;
}

.zoom-on-hover:hover {
  transform: scale(1.05);
  transition: transform 0.2s;
}

.image-container {
  position: relative;
}

.image {
  display: block;
  width: 100%;
  height: auto;
}

.description {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  text-align: left;
  opacity: 0;
  transition: opacity 0.3s;
}

.zoom-on-hover:hover .description {
  opacity: 1;
}

.description-heading {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.description-body {
  font-size: 0.9rem;
  margin: 0;
}


</style>
