// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入移动端rest.css
import "./assets/css/yddreset.css"
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

//引入弹窗
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(VueSweetalert2);
//引入rem
import "./assets/js/rem"
//引入axios
import axios from "axios"
Vue.prototype.$http = axios;

Vue.use(Vant);
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
