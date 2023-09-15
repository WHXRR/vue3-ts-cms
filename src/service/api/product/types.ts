export interface IDataType<T = any> {
  code: number,
  data: T
}

export interface IGoodsListType {
  totalCount: number
  list: any[]
}
