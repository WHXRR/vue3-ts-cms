import myAxios from "./request"
import { BASE_URL } from "./config"
import useCache from "@/utils/cache"

const axios = new myAxios({
  baseURL: BASE_URL,
  timeout: 10000,
  interceptors: {
    requestInterceptors: config => {
      const token = useCache.getItem('cmsToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default axios
