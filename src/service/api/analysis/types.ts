export interface IDataType<T = any> {
  code: number,
  data: T[]
}

export interface ICategoryCountListType {
  id: number,
  name: string,
  goodsCount: number,
  goodsFavor: number,
  saleCount: number,
  address: string,
  count: number
}

export interface IAddressSale {
  amount: string,
  title: string,
  tips: string,
  subtitle: string,
  number1: number,
  number2: number
}

export interface IConfig {
  showLoading?: boolean
  showTips?: boolean
}
