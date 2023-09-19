import api from "../../index"
import type { IDataType, IUserListType } from "./types"

enum SystemURL {
  UserList = '/users/list',
  DelUser = '/users/',
  RoleList = '/role/list',
  MenuList = '/menu/list',
  DepartmentList = '/department/list',
}

export function getUserList(queryInfo: any) {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.UserList,
    data: queryInfo,
    showLoading: true
  })
}

export function delUser(id: number) {
  return api.delete<IDataType<IUserListType>>({
    url: SystemURL.DelUser + id,
    showLoading: true,
    showTips: true
  })
}

export function getRoleList(queryInfo: any) {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.RoleList,
    data: queryInfo,
    showLoading: true
  })
}

export function getMenuList() {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.MenuList,
    showLoading: true
  })
}

export function getDepartmentList(queryInfo: any) {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.DepartmentList,
    data: queryInfo,
    showLoading: true
  })
}
