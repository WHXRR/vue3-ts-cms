import api from "../../index"
import type { IAccount, ILoginResult, IDataType } from "./types"

enum LoginURL {
  AccountLogin = '/login'
}

export function accountLogin(params: IAccount) {
  return api.post<IDataType<ILoginResult>>({
    url: LoginURL.AccountLogin,
    data: params,
    showLoading: true
  })
}
