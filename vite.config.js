/*
 * @Author: your name
 * @Date: 2021-10-16 15:31:30
 * @LastEditTime: 2022-02-20 15:33:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \tblog\vite.config.js
 */
import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default (({
  command,
  mode,
}) => {
  let domain = '';
  switch (mode) {
    case 'locally':
      domain = "http://localhost:8081";
      break;
    case 'development':
      domain = "http://tblogtest.falseendless.cn"
      break;
    case 'production':
      domain = "http://tblog.falseendless.cn"
      break;
  }
  return defineConfig({
    plugins: [vue()],
    base: '/view/',
    server: {
      port: "3257",
      proxy: {
        '/api': domain
      }
    },
    build: {
      rollupOptions: {
        external: ['jquery'],
        output: {
          jquery: "$"
        }
      }
    }
  })
})