import { defineStore } from "pinia";
import { ref } from "vue";
import { useLoginStore } from "@/stores/login"
import useCache from "@/utils/cache"
import router from '@/router'

export const useSystemStore = defineStore("system", () => {
  const loading = ref(false)
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
    exit,
  }
})

