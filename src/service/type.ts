
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"

export interface requestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (res: T) => T
  responseInterceptorsCatch?: (error: any) => any
}

export interface requestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: requestInterceptors<T>
}

