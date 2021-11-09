import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import './plugins/element.js'
import axiosSetting from './untils/axios-setting';
import axios from 'axios';
import {Message,Loading} from 'element-ui'

Vue.config.productionTip = false;

axiosSetting.init();
Vue.prototype.$http = axios;
Vue.prototype.$toast = Message;

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
