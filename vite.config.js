import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

export default (({
  command,
  mode,
}) => {
  let domain = '';
  switch (mode) {
    case 'locally':
      domain = "http://localhost:8081";
      break;
    case 'production':
      domain = "http://tblog.falseendless.cn"
      break;
  }
  console.log("CurrentEnvironment:", mode, domain);
  return defineConfig({
    plugins: [vue()],
    base: '/view/',
    server: {
      host:'0.0.0.0',
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