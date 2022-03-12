/*
 * @Author: your name
 * @Date: 2021-10-30 14:39:44
 * @LastEditTime: 2022-03-05 14:25:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tblog\src\router\router.js
 */
import {
  createRouter
} from 'vue-router'
const routes = [{
  name: "登录",
  path: '/view/login',
  component: () => import('../components/Login.vue')
}, {
  name: "注册",
  path: '/view/register',
  component: () => import('../components/Register.vue')
}, {
  name: "找回密码",
  path: '/view/recoverpwd',
  component: () => import('../components/RecoverPwd.vue')
}, {
  name: "首页",
  path: '/view/index/:blogname',
  component: () => import('../components/Index.vue'),
  children: [{
    name: "首页",
    path: '',
    component: () => import('../components/Index-Main.vue')
  }]
}, {
  path: '/view/index',
  component: () => import('../components/Index.vue'),
  children: [{
      name: "",
      path: 'userinfo/:blogname',
      component: () => import('../components/UserInfo.vue')
    },
    {
      name: "文章-写文章",
      path: 'articleEditor/:blogname',
      component: () => import('../components/ArtcleEditor.vue')
    },
    {
      name: "文章-文章列表",
      path: 'articleList/:blogname',
      component: () => import('../components/ArtcleList.vue')
    }
  ]
}]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}