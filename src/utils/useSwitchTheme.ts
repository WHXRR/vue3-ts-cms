import { darkTheme } from "@/assets/css/dark"
import { lightTheme } from "@/assets/css/light"
import useCache from "@/utils/cache"

export const setCssVar = (isDark: string) => {
  const theme = isDark === 'dark' ? darkTheme : lightTheme
  Object.entries(theme).forEach(([name, value]) => {
    document.documentElement.style.setProperty(name, value)
  })
  if (isDark === 'dark') {
    useCache.setItem('cmsTheme', 'dark')
  } else {
    useCache.setItem('cmsTheme', 'light')
  }
}

export default setCssVar
