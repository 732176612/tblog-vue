/*
 * @Author: your name
 * @Date: 2021-10-16 15:31:30
 * @LastEditTime: 2022-03-13 14:57:30
 * @LastEditors: Please set LastEditors
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

const app = createApp(App)
const router = createRouter(createWebHistory())
app.use(router)
app.use(Toast)

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
app.config.globalProperties.$toast = toast;
app.config.globalProperties.$cookie = cookie;
app.config.globalProperties.$dayjs = dayjs;

import loadingBtn from './components/UI/LoadingBtn.vue'
import CheckInput from './components/UI/CheckInput.vue'
import Mescroll from './components/UI/Mescroll.vue'
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
})
router.afterEach(() => {
  NProgress.done()
})