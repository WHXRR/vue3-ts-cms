import api from "../../index"
import type { IDataType, IUserListType, IConfig } from "./types"

enum SystemURL {
  UserList = '/users/list',
  AddUser = 'users',
  DelUser = '/users/',
  RoleList = '/role/list',
  Role = '/role',
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

export function addUser(Info: any) {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.AddUser,
    data: Info,
    showLoading: true,
    showTips: true
  })
}

export function editUser(Info: any, id: number) {
  return api.patch<IDataType<IUserListType>>({
    url: SystemURL.AddUser + `/${id}`,
    data: Info,
    showLoading: true,
    showTips: true
  })
}

export function getRoleList(queryInfo: any, config?: IConfig) {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.RoleList,
    data: queryInfo,
    ...config
  })
}

export function addRole(Info: any) {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.Role,
    data: Info,
    showLoading: true,
    showTips: true
  })
}

export function editRole(Info: any, id: number) {
  return api.patch<IDataType<IUserListType>>({
    url: SystemURL.Role + `/${id}`,
    data: Info,
    showLoading: true,
    showTips: true
  })
}

export function delRole(id: number) {
  return api.delete<IDataType<IUserListType>>({
    url: SystemURL.Role + `/${id}`,
    showLoading: true,
    showTips: true
  })
}

export function getMenuList() {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.MenuList,
  })
}

export function getDepartmentList(queryInfo: any) {
  return api.post<IDataType<IUserListType>>({
    url: SystemURL.DepartmentList,
    data: queryInfo,
  })
}
