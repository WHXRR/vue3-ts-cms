import api from "../../index"
import type { IDataType, IGoodsListType } from "./types"

enum ProductURL {
  GoodsList = '/goods/list',
}

export function getGoodsList(queryInfo: any) {
  return api.post<IDataType<IGoodsListType>>({
    url: ProductURL.GoodsList,
    data: queryInfo,
    showLoading: true
  })
}
