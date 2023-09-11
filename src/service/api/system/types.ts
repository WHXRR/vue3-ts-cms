export interface IDataType<T = any> {
  code: number,
  data: T
}

export interface IUserListType {
  totalCount: number
  list: any[]
}
