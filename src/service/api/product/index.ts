import api from "../../index"
import type { IDataType, IGoodsListType } from "./types"

enum ProductURL {
  GoodsList = '/goods/list',
  CategoryList = '/category/list'
}

export function getGoodsList(queryInfo: any) {
  return api.post<IDataType<IGoodsListType>>({
    url: ProductURL.GoodsList,
    data: queryInfo,
    showLoading: true
  })
}

export function getCategoryList(queryInfo: any) {
  return api.post<IDataType<IGoodsListType>>({
    url: ProductURL.CategoryList,
    data: queryInfo,
    showLoading: true
  })
}
