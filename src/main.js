import 'virtual:windi.css';
import 'virtual:windi-devtools';
import { createApp } from 'vue-demi';
import App from './App.vue';
import router from './router';
import './plugins/index.js';

const app = createApp(App);
app.use(router);
app.mount('#app');
