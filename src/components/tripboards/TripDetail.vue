
<script setup>
import { ref, onMounted } from 'vue';
import { defineProps } from 'vue';
import {getTripDetails, getAttractionImages, getTrip} from '@/api/Trip.js';
import  alterImg  from '@/assets/images.jpg'

const props = defineProps({
  tripId: {
    type: String,
    required: true
  }
});

const tripName = ref('여행 정보');
const attractions = ref([]);
const selectedAttraction = ref(null);
const selectedAttractionImages = ref([]);

const fetchTripDetails = async () => {
  console.log("해당 tripDetail 정보를 가지러 감 . " , props.tripId)
  getTripDetails(
      props.tripId,
      (success) => {
        attractions.value = success.data;
        console.log("attractions : ", attractions.value)
      },(error) => {
        console.log("여행 코스들을 가져오는데 실패했습니다." , error)
      }
  );
};

const fetchImageDetail = async (attractionId) => {
  console.log("tripImage 정보를 가지러 감")
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

const imageSrc = (imageData) => {
  return `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(imageData)))}`;
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
    <h1 class="text-center mb-4">{{ tripName }}</h1>
    <div class="row">
      <!-- 관광지 리스트 -->
      <div class="col-md-4" v-for="attraction in attractions" :key="attraction.attractionId">
        <div class="card mb-3" @click="fetchImageDetail(attraction.attractionId)">
          <div class="card-body">
            <h5 class="card-title">{{ attraction.attractionName }}</h5>
            <p class="card-text">{{ attraction.attractionDescription }}</p>
          </div>
        </div>
      </div>
    </div>

    <section class="gallery-block compact-gallery">
      <div class="container">
        <div class="heading">
          <h2>{{ tripName }}</h2>
        </div>
        <div class="row no-gutters">
          <div v-for="image in selectedAttractionImages" :key="image.imageId">
            <div class="col-md-6 col-lg-4 item zoom-on-hover">
                <a class="lightbox" :href="alterImg || imageSrc(image.image)">
                  <img
                      class="img-fluid image"
                      :src="alterImg || imageSrc(image.image)"
                      :alt="image.imageDescription"
                  >
                  <span class="description">
                    <span class="description-heading">{{ image.imageDescription }}</span>
                    <span class="description-body">{{ formatDate(image.date) }}</span>
                  </span>
              </a>
            </div>
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

.gallery-block{
  padding-bottom: 60px;
  padding-top: 60px;
}

.gallery-block .heading{
  margin-bottom: 50px;
  text-align: center;
}

.gallery-block .heading h2{
  font-weight: bold;
  font-size: 1.4rem;
  text-transform: uppercase;
}

.gallery-block.compact-gallery .item{
  overflow: hidden;
  margin-bottom: 0;
  background: black;
  opacity: 1;
}

.gallery-block.compact-gallery .item .image{
  transition: 0.8s ease;
}

.gallery-block.compact-gallery .item .info{
  position: relative;
  display: inline-block;
}

.gallery-block.compact-gallery .item .description{
  display: grid;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #fff;
  padding: 10px;
  font-size: 17px;
  line-height: 18px;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  opacity: 1;
  color: #fff;
  transition: 0.8s ease;
  text-align: center;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.39));
}

.gallery-block.compact-gallery .item .description .description-heading{
  font-size: 1em;
  font-weight: bold;
}

.gallery-block.compact-gallery .item .description .description-body{
  font-size: 0.8em;
  margin-top: 10px;
  font-weight: 300;
}

@media (min-width: 576px) {

  .gallery-block.compact-gallery .item .description {
    opacity: 0;
  }

  .gallery-block.compact-gallery .item a:hover .description {
    opacity: 1;
  }

  .gallery-block .zoom-on-hover:hover .image {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

</style>
