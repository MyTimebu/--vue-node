import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import video from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-contrib-hls'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control

// 请求接口方法公共，注：因是个人所以目前不存在复杂页面的调用实行本页面掉接口
import request from '@/utils/request'
Vue.prototype.request = request
Vue.prototype.$video = video
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 * 如果您不想使用模拟服务器
   您想将MockJs用于模拟API
   您可以执行：mockXHR（）
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

import { mockXHR } from '../mock'
// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
