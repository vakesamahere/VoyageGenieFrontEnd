import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import V3waterfall from 'v3-waterfall'
import 'v3-waterfall/dist/style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store.js';

const app = createApp(App)
app.use(store);
app.use(V3waterfall)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {
    locale: zhCn,
  })

app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.mount('#app')

// 定义CSS变量
const cssVariables = {
  '--bg-color': '#111',
  '--display-text-color': '#bbb',
  '--display-text-color-active': 'orange',
};

// 将CSS变量注入到:root伪类选择器中
Object.keys(cssVariables).forEach((key) => {
  document.documentElement.style.setProperty(key, cssVariables[key]);
});

const _test = true
export {
  _test
}