import { defineStore } from "pinia";
import { ref } from "vue";
import router from "@/router"
import useCache from "@/utils/cache"
import getUserMenuFn from "@/router/mapRoutes"
import api from "@/service/api"

export const useUserInfoStore = defineStore("user", () => {
  const userID = ref(0)
  const userInfo = ref<any>({})
  const userMenus = ref<any>([])

  function getUserInfo() {
    return api.getUserInfo(userID.value).then(res => {
      userInfo.value = res.data
      useCache.setItem("cmsUserInfo", res.data)
    })
  }
  function getUserMenu() {
    return api.getUserMenu(userID.value).then(async res => {
      userMenus.value = res.data
      useCache.setItem("cmsUserMenus", res.data)
      const routes = await getUserMenuFn(res.data)
      routes.forEach(route => {
        router.addRoute('main', route)
      })
    })
  }
  return {
    userID,
    userInfo,
    userMenus,
    getUserInfo,
    getUserMenu
  }
})
