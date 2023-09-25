import api from "../../index"
import type { IDataType, ICategoryCountListType, IAddressSale, IConfig } from "./types"

enum DashboardURL {
  CategoryCount = '/goods/category/count',
  CategorySale = '/goods/category/sale',
  CategoryFavor = '/goods/category/favor',
  SaleTop10 = '/goods/sale/top10',
  AddressSale = '/goods/address/sale',
  AmountList = '/goods/amount/list',
}

export function getCategoryCount(config?: IConfig) {
  return api.get<IDataType<ICategoryCountListType>>({
    url: DashboardURL.CategoryCount,
    ...config
  })
}

export function getCategorySale(config?: IConfig) {
  return api.get<IDataType<ICategoryCountListType>>({
    url: DashboardURL.CategorySale,
    ...config
  })
}

export function getCategoryFavor(config?: IConfig) {
  return api.get<IDataType<ICategoryCountListType>>({
    url: DashboardURL.CategoryFavor,
    ...config
  })
}

export function getSaleTop10(config?: IConfig) {
  return api.get<IDataType<ICategoryCountListType>>({
    url: DashboardURL.SaleTop10,
    ...config
  })
}

export function getAddressSale(config?: IConfig) {
  return api.get<IDataType<ICategoryCountListType>>({
    url: DashboardURL.AddressSale,
    ...config
  })
}

export function getAmountList(config?: IConfig) {
  return api.get<IDataType<IAddressSale>>({
    url: DashboardURL.AmountList,
    ...config
  })
}
