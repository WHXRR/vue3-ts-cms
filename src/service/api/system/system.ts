import api from "../../index"
import type { IDataType, IUserListType } from "./types"

enum SystemURL {
  UserList = '/users/list'
}

export function getUserList(queryInfo: any) {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.UserList,
    data: queryInfo,
    showLoading: true
  })
}
