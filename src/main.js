

//import { createPinia } from 'pinia'
import { createApp } from 'vue';
import { createPinia } from "pinia";
import App from './App.vue';
import router from './router';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "bootstrap";
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useKakao } from 'vue3-kakao-maps/@utils';

const app = createApp(App)
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
// Optionally install the BootstrapVue icon components plugin


//app.use(createPinia())
app.use(router)
app.use(pinia)
useKakao('e346d8814c2023d07e27ee7ed1f89755');
app.mount('#app')
