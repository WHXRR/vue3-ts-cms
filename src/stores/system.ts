import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
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
  const systemTheme = ref(useCache.getItem("cmsTheme") || "light")
  const menuCollapsed = ref(false)
  const systemHistoryRoutes = ref<IRoute[]>(useCache.getItem("cmsHistoryRoutes") || [])
  const currentTabs = ref('')
  const openKeys = ref<number[]>([])
  const selectedKeys = ref<number[]>([])

  watch(systemHistoryRoutes, () => {
    useCache.setItem("cmsHistoryRoutes", systemHistoryRoutes.value)
  }, {
    deep: true
  })

  const systemThemeColor = computed(() => {
    if (systemTheme.value === "dark") {
      return {
        color: "#ff8975",
        bgColor: "#1b1c21"
      }
    } else {
      return {
        color: "#dd5048",
        bgColor: "#ffffff"
      }
    }
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
    systemThemeColor,
    menuCollapsed,
    systemHistoryRoutes,
    currentTabs,
    openKeys,
    selectedKeys,
    exit,
  }
})

