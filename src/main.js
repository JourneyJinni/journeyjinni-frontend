

//import { createPinia } from 'pinia'
import { createApp } from 'vue';
import { createPinia } from "pinia";
import App from './App.vue';
import router from './router';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "bootstrap";
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ImageUploader from 'vue-image-upload-resize'


const app = createApp(App)
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
// Optionally install the BootstrapVue icon components plugin


//app.use(createPinia())
app.use(ImageUploader);
app.use(router)
app.use(pinia)
app.mount('#app')
