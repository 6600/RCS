
import Vue from 'vue'
import App from './App'
import router                                from './router'
//这里引入了相关PC的UI框架（element-ui,mint-ui），以及相关css样式
import ElementUI                             from 'element-ui'
import MintUI                                from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css' 
import AFTableColumn                         from 'af-table-column'
import scroll                                from 'vue-seamless-scroll'

import         $                             from 'webpack-zepto'
import         axios                         from 'axios'
import ECharts                               from 'echarts'
import store                                 from './store/index'
import VueResource from 'vue-resource'  

import { createSocket }                      from './assets/websocket/socketclient'
import config                                from './assets/config/config'      //相关配置参数
import Method                                from './assets/js/Mythod'
import      moment                           from 'moment'
//import Flatten                                                            from '@flatten-js/core'

//地图插件
import  * as L                               from 'leaflet'  

import  vueSwiper                            from 'vue-awesome-swiper'
import  {TweenMax}                           from 'gsap'
require('./assets/js/soundjs-0.6.2.min.js')  

//import "./assets/less/grid.scss"; 
import "./assets/less/sreenadapter.less"; 
import "./assets/less/mycss.less";                     //我的相关样式

import "leaflet/dist/leaflet.css";                     //地图插件样式
import "./assets/icon/iconfont.css";                   //字体图标样式a
import 'swiper/dist/css/swiper.css'
// require('./assets/icon/iconfont.js');
import ('./assets/icon/iconfont')
import ('./assets/icon/iconPlace')
import ('./assets/icon/iconfonts')
Vue.L = Vue.prototype.$L = L  

Vue.config.productionTip = false
 
Vue.use(vueSwiper)
Vue.use(ElementUI)
Vue.use(MintUI)
Vue.use(scroll) 
Vue.use(AFTableColumn)

Vue.use(VueResource) 
Vue.prototype.$echarts=ECharts                                                   //统计图表插件       api:http://echarts.apache.org/zh/api.html#echarts
Vue.prototype.$moment = moment                                                   //时间插件           api:http://momentjs.cn/
Vue.prototype.tween = TweenMax                                                   //缓动动效插件       api:https://www.tweenmax.com.cn/api/tweenmax/
Vue.prototype.$ = $                                                              //jquery,dom操作插件
Vue.prototype.axios = axios                                                      //ajax 后台数据库请求接口

//getAjaxURL                //获取现场IP
//
 new createSocket(config.socketPort)                                                 //websocket连接，以及Rcs相关数据处理的相关Function,此类封装在asses/js/socketclient/文件下
 
axios.defaults.baseURL = Method.getAjaxURL()                         //开发IP端口
console.log('ajax服务端IP端口：',   axios.defaults.baseURL)

axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
//axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8';

//axios.defaults.transformRequest = [function (data) {
//    let ret = ''
//    for (let it in data) {
//      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//    }
//    return ret
//}] 
/* eslint-disable no-new */  
let sound

var sounds = [  {src:'./static/media/alarm.mp3', id:"bg"} ]
createjs.Sound.alternateExtensions = ["mp3"];
createjs.Sound.on("fileload", loadHandler);
createjs.Sound.registerSounds(sounds);
 function loadHandler(event) { 
    // 这会引发针对每个已注册的声音。
     sound     = createjs.Sound.play("bg");  // 发挥使用ID。也可以使用完整的源路径或event.src。 
     sound.volume = 1;
     sound.stop()
     Vue.prototype.sound = sound       
     console.log('createjs.Sound',sound) 
  }  
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
 
router.beforeEach(({meta,path},from,next)=>{    //守卫导航
  var isLogin=Boolean(store.state.user.username)
  if(isLogin=='/login'){
    return next({path:'/login'})
  }
  next()
})