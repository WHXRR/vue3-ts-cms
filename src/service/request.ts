import axios from "axios"
import NProgress from "nprogress"
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
      console.log(NProgress);
      return config
    }, (error) => {
      return error
    })
    this.instance.interceptors.response.use((config) => {
      NProgress.done();
      return config.data
    }, (error) => {
      NProgress.done()
      return error
    })
  }

  request<T>(config: requestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config as InternalAxiosRequestConfig)
      }
      this.instance.request<any, T>(config).then(res => {
        if (config.interceptors?.responseInterceptors) {
          res = config.interceptors.responseInterceptors(res)
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
