import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from '@/plugins/vant'
import swiper from '@/plugins/swiper'
import '@/assets/style/reset.css'
import '@/assets/style/mixin.less'

createApp(App)
  .use(store)
  .use(router)
  .use(vant)
  .use(swiper)
  .mount('#app')
