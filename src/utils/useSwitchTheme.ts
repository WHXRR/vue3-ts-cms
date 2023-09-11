import { darkTheme } from "@/assets/css/dark"
import { lightTheme } from "@/assets/css/light"
import { useSystemStore } from "@/stores/system"
import useCache from "@/utils/cache"

export const setCssVar = (isDark: string) => {
  const theme = isDark === 'dark' ? darkTheme : lightTheme
  const systemStore = useSystemStore()
  Object.entries(theme).forEach(([name, value]) => {
    if (name === '--color') {
      document.documentElement.style.setProperty(name, systemStore.systemThemeColor.color)
    } else {
      document.documentElement.style.setProperty(name, value)
    }
  })
  if (isDark === 'dark') {
    useCache.setItem('cmsTheme', 'dark')
  } else {
    useCache.setItem('cmsTheme', 'light')
  }
}

export default setCssVar
