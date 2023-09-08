import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useLoginStore } from "@/stores/login"
import useCache from "@/utils/cache"
import router from '@/router'

interface IRoute {
  name: string,
  url: string,
  query?: any
}

export const useSystemStore = defineStore("system", () => {
  const loading = ref(false)
  const systemTheme = useCache.getItem("cmsTheme") || ref("light")
  const menuCollapsed = ref(false)
  const systemHistoryRoutes = ref<IRoute[]>(useCache.getItem("cmsHistoryRoutes") || [])
  const currentTabs = ref('')


  watch(systemHistoryRoutes, () => {
    useCache.setItem("cmsHistoryRoutes", systemHistoryRoutes.value)
  }, {
    deep: true
  })

  function exit() {
    const loginStore = useLoginStore()
    loginStore.token = ""
    useCache.removeItem("cmsToken")
    useCache.removeItem("cmsUserID")
    useCache.removeItem("cmsUserInfo")
    useCache.removeItem("cmsUserMenus")
    router.push("/login")
  }
  return {
    loading,
    systemTheme,
    menuCollapsed,
    systemHistoryRoutes,
    currentTabs,
    exit,
  }
})

