export interface IDataType<T = any> {
  code: number,
  data: T
}

export interface IUserListType {
  totalCount: number
  list: any[]
}

export interface IConfig {
  showLoading?: boolean
  showTips?: boolean
}
