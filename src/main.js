

//import { createPinia } from 'pinia'
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import "bootstrap";
import 'bootstrap-vue/dist/bootstrap-vue.css';
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App)


// Optionally install the BootstrapVue icon components plugin


//app.use(createPinia())
app.use(router)

app.mount('#app')
