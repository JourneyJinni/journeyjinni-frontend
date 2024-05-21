<template >
    <header>
      <div class="container-fluid background-image">
        <div class="row" id="header_div">
          <div class="col-md-9 row justify-content-center position-relative">
            <div class="row justify-content-center text-center text-white">
              <div style="height:30px;"></div>
              <h2>Enjoy Trip에 오신것을 환영합니다.</h2>
              <h4>나의 여행계획을 사랑하는 사람들과 공유하세요.</h4>
            </div>
          </div>
          <div class="col-md-3 row justify-content-center position-relative align-items-center">
          </div>
        </div>
      </div>
    </header>
</template>

<script setup>

</script>

<style scoped>
  #header_div {
  height: 400px; /* 필요에 따라 높이 조정 */
  overflow: hidden;
}

.background-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), 
                    url('https://source.unsplash.com/random/?trip,travel'); /* 이미지 및 어둡게 처리 */
  background-size: cover; /* 이미지 크기를 div에 맞춤 */
  background-position: center; /* 중앙 정렬 */
  background-repeat: no-repeat; /* 이미지 반복 방지 */
  height: 100%; /* 전체 높이 */
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>