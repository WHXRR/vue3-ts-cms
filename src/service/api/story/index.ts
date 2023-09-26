import api from "../../index"
import type { IDataType, IListType } from "./types"

enum StoryURL {
  Story = '/story',
  StoryList = '/story/list',
}

export function getStoryList(queryInfo: any) {
  return api.post<IDataType<IListType>>({
    url: StoryURL.StoryList,
    data: queryInfo,
    showLoading: true
  })
}

export function addStory(queryInfo: any) {
  return api.post<IDataType<IListType>>({
    url: StoryURL.Story,
    data: queryInfo,
    showLoading: true,
    showTips: true
  })
}
