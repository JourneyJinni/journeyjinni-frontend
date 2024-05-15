<script setup>
import axios from "axios";
import { watch, ref } from "vue"
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';

const props = defineProps({
  sido: String,
  gugun: String,
  attractionType: String
})
const searchedList = ref([]);

const coordinate = ref ({
  lat: 33.450701,
  lng: 126.570667
});
const propsWatch = watch(props,
  () => {
    axios.post("http://localhost/filterlist", props)
    .then(({data}) => {
      console.log("성공")
      console.log(data)
      searchedList.value = data
    })
    .catch((error) => {
    console.log("실패")
})
  }
)
axios.post("http://localhost/filterlist", props)
  .then((response) => {
  console.log("성공")
  })
  .catch((error) => {
  console.log("실패")
})
const setMap = (latitude, longitude) => {
  console.log(latitude, longitude)
  coordinate.value = {
  lat: latitude,
  lng: longitude
};
}

</script>

<template>
  <div class="container mt-3">
		<div class="row">
      <div class="col-md-6">
				<div class="rounded p-4 bg-light shadow">
          <div class="row">
						<!-- 왼쪽: 검색 결과 -->
						<div class="col-md-8">
							<h4 class="mb-4">Search Result</h4>
						</div>
						<!-- 오른쪽: 버튼 -->
						<div class="col-md-4">
							<button type="button" class="btn btn-primary btn-sm float-right"
								id="rootSearch">경로 검색</button>
						</div>
          </div>
            <ul>
              <li class="row" v-for="(result,index) in searchedList" :key="index">
								<div class="col-7">
                  <h4>{{ result.title }}</h4>
                  <p>{{result.addr1}}</p>
                  <p></p>
                </div>
                <div class="col-5">
									<!-- <label class="form-check-label font-weight-bold"
										for="attraction<%=count%>">경로추가</label> <input
										class="form-check-input" style="width: 25px; height: 25px;"
										type="checkbox" value="<%=count%>" id="attractionCheckbox<%=count%>"
										name="attractionCheckbox">
									<button type="button" class="btn btn-primary btn-sm"
										data-toggle="modal" data-target="#<%=modalId%>">더보기</button> -->
									<button class="btn btn-primary"
										@click="setMap(result.latitude,result.longitude)">위치</button>
								</div>
              </li>
            </ul>
					
        </div>
      </div>
      <div class="col-md-6">
        <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
    <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
  </KakaoMap>
      </div>
    </div>
  </div>

</template>

<style scoped>


</style>