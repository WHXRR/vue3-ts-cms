export interface IDataType<T = any> {
  code: number,
  data: T
}

export interface IListType {
  totalCount: number
  list: any[]
}
