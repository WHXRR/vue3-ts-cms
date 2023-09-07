import { createApp } from "vue"
import { createPinia } from "pinia"
import { useLoginStore } from "@/stores/login"
import { useUserInfoStore } from "@/stores/user"
import useCache from "@/utils/cache"
import Antd from 'ant-design-vue';
import App from "./App.vue"
import router from "./router"
import setCssVar from "@/utils/useSwitchTheme"
import { useSystemStore } from "@/stores/system"

import 'normalize.css'
import './assets/css/base.css'
import 'ant-design-vue/dist/reset.css';
import 'nprogress/nprogress.css'
import '@/assets/css/theme.css'

const app = createApp(App)

app.use(createPinia())
app.use(Antd)
// 先初始化路由后再注册路由
await init()
app.use(router)
app.mount("#app")

async function init() {
  const loginStore = useLoginStore()
  const userStore = useUserInfoStore()
  const systemStore = useSystemStore()
  setCssVar(systemStore.systemTheme)
  const token = useCache.getItem("cmsToken")
  const userID = useCache.getItem("cmsUserID")
  if (token && userID) {
    loginStore.token = token
    userStore.userID = userID
    await userStore.getUserInfo()
    await userStore.getUserMenu()
  }
}
