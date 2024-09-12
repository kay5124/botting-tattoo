import { createApp } from 'vue';
import { createPinia } from 'pinia';
// import i18n from './plugins/i18n';
import Vue3Marquee from 'vue3-marquee';
import { Quasar, Loading, Dialog, Notify } from 'quasar';

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css';
// Import Quasar css
import 'quasar/src/css/index.sass';
import './style.css';
// Import custom css
import '@/scss/global.scss';
import '@/scss/color.scss';

import 'swiper/css';
import 'swiper/css/pagination';

import router from './router/router';
import App from './App.vue';

const myApp = createApp(App);

myApp
  .use(createPinia())
  .use(Quasar, {
    plugins: { Loading, Dialog, Notify },
  })
  // .use(i18n)
  .use(router)
  .use(Vue3Marquee)
  .mount('#app');

export default myApp;
