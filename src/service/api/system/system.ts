import api from "../../index"
import type { IDataType, IUserListType } from "./types"

enum SystemURL {
  UserList = '/users/list',
  RoleList = '/roles/list'
}

export function getUserList(queryInfo: any) {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.UserList,
    data: queryInfo,
    showLoading: true
  })
}

export function getRoleList(queryInfo: any) {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.RoleList,
    data: queryInfo,
    showLoading: true
  })
}
