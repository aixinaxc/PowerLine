import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import vcolorpicker from 'vcolorpicker'
import store from './store/'
import ConstData from './assets/js/ConstData'
Vue.use(vcolorpicker)
Vue.use(Antd);

Vue.prototype.$ConstData = ConstData
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
