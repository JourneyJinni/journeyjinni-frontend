

//import { createPinia } from 'pinia'
import { createApp } from 'vue';
import { createPinia } from "pinia";
import App from './App.vue';
import router from './router';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "bootstrap";
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { useKakao } from 'vue3-kakao-maps';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // 이 줄을 추가하여 부트스트랩 JS를 포함합니다.







const app = createApp(App)
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
// Optionally install the BootstrapVue icon components plugin

useKakao('e346d8814c2023d07e27ee7ed1f89755',['clusterer', 'services', 'drawing']);

app.use(router)
app.use(pinia)
app.mount('#app')
