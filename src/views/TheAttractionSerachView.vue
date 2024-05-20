<template>
  <div class="container mt-3">
    <div class="row">
      <div class="col-md-4">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs custom-nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a
                class="nav-link"
                :class="{ 'active': currentTab === 'AttractionByCityAndCategory' }"
                @click="changeTab('AttractionByCityAndCategory')"
                role="tab"
                aria-controls="AttractionByCityAndCategory"
                aria-selected="true"
            >
              도시와 유형으로 관광지 찾기
            </a>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs custom-nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a
                class="nav-link"
                :class="{ 'active': currentTab === 'AttractionByImageLocation' }"
                @click="changeTab('AttractionByImageLocation')"
                role="tab"
                aria-controls="AttractionByImageLocation"
                aria-selected="false"
            >
              사진 기반으로 관광지 찾기
            </a>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs custom-nav-tabs" id="myTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a
                class="nav-link"
                :class="{ 'active': currentTab === 'AttractionByMyLocation' }"
                @click="changeTab('AttractionByMyLocation')"
                role="tab"
                aria-controls="AttractionByMyLocation"
                aria-selected="false"
            >
              내 위치 기반으로 관광지 찾기
            </a>
          </li>
        </ul>
      </div>

      <!-- Tab content -->
      <div class="col-md-12 mt-3">
        <transition name="fade" mode="out-in">
          <div v-if="currentTab === 'AttractionByCityAndCategory'" key="AttractionByCityAndCategory">
            <AttractionByCityAndCategory />
          </div>
          <div v-else-if="currentTab === 'AttractionByImageLocation'" key="AttractionByImageLocation">
            <AttractionByImageLocation />
          </div>
          <div v-else key="AttractionByMyLocation">
            <AttractionByMyLocation />
          </div>
        </transition>
      </div>
    </div>

    <div class="col-md-12 mt-3">
      <AttractionListItem />
    </div>
  </div>
</template>

<script>
import AttractionByCityAndCategory from '@/components/attraction/AttractionByCityAndCategory.vue';
import AttractionByImageLocation from '@/components/attraction/AttractionByImageLocation.vue';
import AttractionByMyLocation from '@/components/attraction/AttractionByMyLocation.vue';
import AttractionListItem from '@/components/attraction/AttractionListItem.vue';

export default {
  components: {
    AttractionByCityAndCategory,
    AttractionByImageLocation,
    AttractionByMyLocation,
    AttractionListItem,
  },
  data() {
    return {
      currentTab: 'AttractionByCityAndCategory'
    };
  },
  methods: {
    changeTab(tabName) {
      this.currentTab = tabName;
    }
  }
};
</script>

<style scoped>
/* Custom styles for the tabs */
.custom-nav-tabs .nav-link {
  border: none;
  background: none;
  color: #333;
  cursor: pointer;
  transition: 0.3s;
}

.custom-nav-tabs .nav-link.active {
  font-weight: bold;
  color: #007bff;
  border-bottom: 2px solid #007bff;
}

.custom-nav-tabs .nav-link:hover {
  color: #007bff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
