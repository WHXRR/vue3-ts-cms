import { createApp } from "vue"
import { createPinia } from "pinia"
import { globalRegister } from "@/global"
import Antd from 'ant-design-vue';
import App from "./App.vue"
import router from "./router"
import i18n from './locals'
import init from "@/utils/init"

import 'normalize.css'
import './assets/css/base.css'
import 'ant-design-vue/dist/reset.css';
import 'nprogress/nprogress.css'
import '@/assets/css/theme.css'

const app = createApp(App)

app.use(createPinia())
// 先初始化路由后再注册路由
await init()
app.use(globalRegister)
app.use(Antd)
app.use(i18n)
app.use(router)
app.mount("#app")
