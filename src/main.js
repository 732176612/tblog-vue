/*
 * @Author: your name
 * @Date: 2021-10-16 15:31:30
 * @LastEditTime: 2022-07-02 11:04:56
 * @LastEditors: FalseEndLess 732176612@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tblog\src\main.js
 */
import {
  createApp
} from 'vue'
import {
  createWebHistory
} from 'vue-router'
import createRouter from './router/router.js'
import App from './App.vue'
import './assets/css/base.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import toast from './assets/js/toast'
import cookie from 'js-cookie'

import AOS from "aos";
import "../node_modules/aos/dist/aos.css";

import 'default-passive-events'

const app = createApp(App)
const router = createRouter(createWebHistory())
const originalPush = router.push;
router.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
app.use(router)
app.use(Toast)
app.AOS = new AOS.init();
app.use(AOS)



dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
app.config.globalProperties.$toast = toast;
app.config.globalProperties.$cookie = cookie;
app.config.globalProperties.$dayjs = dayjs;
app.config.globalProperties.Config = {

  _token: '',
  get token() {
    this._token = getCookie('token');
    if (this._token == undefined) {
      this._token = '';
    }
    return this._token;
  },
  set token(val) {
    if (val == undefined) {
      val = '';
    }
    this._token = val;
  },

  _userSelf: {},
  get userSelf() {
    return this._userSelf;
  },
  set userSelf(val) {
    this._userSelf = val;
  }
};
app.config.globalProperties.isSelf = function (route) { //当前博客是否属于登陆用户的
  return app.config.globalProperties.Config.userSelf.BlogName == route.params.blogname;
};

import loadingBtn from './components/UI/LoadingBtn.vue'
import CheckInput from './components/UI/CheckInput.vue'
import Mescroll from './components/UI/Mescroll.vue'
import AutoTextArea from "./components/UI/TextareaAutosize.vue";
import VueCoreImageUpload from 'vue-image-crop-upload'
app.component('ImageUpload', VueCoreImageUpload);
app.component('AutoTextArea', AutoTextArea);
app.component('loadingbtn', loadingBtn);
app.component('CheckInput', CheckInput);
app.component('Mescroll', Mescroll);

router.isReady().then(() => {
  app.mount('#app')
})

import NProgress from "nprogress"
import "nprogress/nprogress.css"
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  if(to.path.indexOf('acticleView')==-1){
    if (to.params.blogname != undefined) {
      document.title = to.params.blogname + '-' + to.name
    } else {
      document.title = to.name
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

// import VConsole from 'vconsole';
// if (location.host.indexOf('tblogtest') != -1 || location.host.indexOf('local') != -1) {
//   const vConsole = new VConsole();
// }