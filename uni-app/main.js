import App from './App'
import {myRequest, checkLogin, getUser, BASE_URL} from "./util/api.js"


// #ifndef VUE3
import Vue from 'vue';

import uView from "uview-ui";
Vue.use(uView);


Vue.prototype.$checkLogin = checkLogin;
Vue.prototype.$getUser = getUser;
Vue.prototype.$baseUrl = BASE_URL;

Vue.config.productionTip = false
App.mpType = 'app'




const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif