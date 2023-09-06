import api from "../../index"
import type { IAccount, ILoginResult, IDataType } from "./types"

enum LoginURL {
  AccountLogin = '/login',
  getUserInfo = '/users/',
  UserMenu = '/role/'
}

export function accountLogin(params: IAccount) {
  return api.post<IDataType<ILoginResult>>({
    url: LoginURL.AccountLogin,
    data: params,
    showLoading: true
  })
}

export function getUserInfo(id: number) {
  return api.get<IDataType>({
    url: LoginURL.getUserInfo + id,
  })
}

export function getUserMenu(id: number) {
  return api.get<IDataType>({
    url: LoginURL.UserMenu + id + '/menu',
  })
}
