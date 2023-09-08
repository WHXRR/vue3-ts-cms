import { defineStore } from "pinia";
import { ref } from "vue";
import { useLoginStore } from "@/stores/login"
import useCache from "@/utils/cache"
import router from '@/router'

interface IRoute {
  name: string,
  url: string
}

export const useSystemStore = defineStore("system", () => {
  const loading = ref(false)
  const systemTheme = useCache.getItem("cmsTheme") || ref("light")
  const menuCollapsed = ref(false)
  const systemHistoryRoutes = ref<IRoute[]>([])
  const currentTabs = ref('')

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

