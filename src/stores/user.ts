import { defineStore } from "pinia";
import { useSystemStore } from "@/stores/system"
import { ref } from "vue";
import router from "@/router"
import useCache from "@/utils/cache"
import getUserMenuFn from "@/router/mapRoutes"
import api from "@/service/api"
import openNotification from "@/hooks/useNotification"


export const useUserInfoStore = defineStore("user", () => {
  const userID = ref(0)
  const userInfo = ref<any>({})
  const userMenus = ref<any>([])
  const departmentList = ref<any>([])
  const roleList = ref<any>([])

  function getUserInfo() {
    return api.getUserInfo(userID.value).then(res => {
      userInfo.value = res.data
      useCache.setItem("cmsUserInfo", res.data)
    })
  }
  function getUserMenu() {
    const systemStore = useSystemStore()
    return api.getUserMenu(userID.value).then(async res => {
      if (!res.data || !res.data.length) {
        systemStore.exit()
        openNotification('用户菜单为空')
      } else {
        userMenus.value = res.data
        useCache.setItem("cmsUserMenus", res.data)
        const routes = await getUserMenuFn(res.data)
        routes.forEach(route => {
          router.addRoute('main', route)
        })
      }
    })
  }
  function getDepartmentList() {
    return api.getDepartmentList({
      offset: 0,
      size: 100
    }).then(res => {
      departmentList.value = res.data.list.map(item => ({
        ...item,
        label: item.name,
        value: item.id
      }))
    })
  }
  function getRoleList() {
    return api.getRoleList({
      offset: 0,
      size: 100
    }).then(res => {
      roleList.value = res.data.list.map(item => ({
        ...item,
        label: item.name,
        value: item.id
      }))
    })
  }
  return {
    userID,
    userInfo,
    userMenus,
    departmentList,
    roleList,
    getUserInfo,
    getUserMenu,
    getDepartmentList,
    getRoleList
  }
})
