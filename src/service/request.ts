import axios from "axios"
import NProgress from "nprogress"
import { useSystemStore } from "@/stores/system"
import openNotification from "@/hooks/useNotification"
import httpErrorStatusHandle from "@/utils/httpErrorStatusHandle"
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios"
import type { requestInterceptors, requestConfig } from "./type"

class myAxios {
  instance: AxiosInstance
  interceptors: requestInterceptors | undefined

  constructor(config: requestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    this.instance.interceptors.request.use((config) => {
      NProgress.start();
      return config
    }, (error) => {
      return error
    })
    this.instance.interceptors.response.use((config) => {
      NProgress.done();
      const systemStore = useSystemStore()
      systemStore.loading = false
      return config.data
    }, (error) => {
      const systemStore = useSystemStore()
      systemStore.loading = false
      httpErrorStatusHandle(error, systemStore)
      NProgress.done()
      return Promise.reject(error)
    })
  }

  request<T>(config: requestConfig<T>): Promise<T> {
    if (config.showLoading) {
      const systemStore = useSystemStore()
      systemStore.loading = true
    }
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as InternalAxiosRequestConfig)
      }
      this.instance.request<any, T>(config).then((res: any) => {
        if (config.interceptors?.responseInterceptors) {
          res = config.interceptors.responseInterceptors(res)
        }
        if (config.showTips) {
          openNotification(res.data)
          if (res.code) {
            reject(res)
          }
        }
        resolve(res)
      }).catch(err => {
        reject(err)
        return err
      })
    })
  }
  get<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: requestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default myAxios
