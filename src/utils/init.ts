
import { useLoginStore } from "@/stores/login"
import { useUserInfoStore } from "@/stores/user"
import { useSystemStore } from "@/stores/system"
import useCache from "@/utils/cache"
import setCssVar from "@/hooks/useSwitchTheme"

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
    try {
      await userStore.getUserInfo()
      await userStore.getDepartmentList()
      await userStore.getRoleList()
      await userStore.getUserMenu()
    } catch (error) {
      console.warn(error);
    }
  }
}

export default init
