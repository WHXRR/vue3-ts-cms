import { useUserInfoStore } from "@/stores/user"
import { mapMenusToPermissions } from "@/utils/mapToMenuChildID"
function usePermissions(pageName: string, handleName: string) {
  const userStore = useUserInfoStore()
  const permissions = mapMenusToPermissions(userStore.userMenus)
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find(item => item === verifyPermission)
}

export default usePermissions
