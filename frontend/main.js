import '@mdi/font/css/materialdesignicons.css';

import app from './App.vue';
import Vue from 'vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  render: h => h(app),
  vuetify
}).$mount('#app');
