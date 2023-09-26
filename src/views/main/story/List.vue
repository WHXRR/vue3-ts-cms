<script setup lang="ts">
import api from "@/service/api"
import { ref, reactive } from "vue"

interface IData {
  content: string
  createAt: string
  id: number
  title: string
}

const storyList = ref<IData[]>([])
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10
})
const getStoryList = () => {
  api
    .getStoryList({
      offset: pagination.pageSize * pagination.current - pagination.pageSize,
      size: pagination.pageSize
    })
    .then((res) => {
      storyList.value = res.data.list
      pagination.total = res.data.totalCount
    })
}
getStoryList()
const handleTableChange = (page: number, pageSize: number) => {
  pagination.current = page
  pagination.pageSize = pageSize
  getStoryList()
}

const open = ref(false)
const storyData = reactive({
  title: "",
  content: "",
  createAt: ""
})
const viewStory = (data: IData) => {
  open.value = true
  storyData.title = data.title
  storyData.content = data.content
  storyData.createAt = data.createAt
}
</script>
<template>
  <div class="story-list box-module-shadow">
    <div class="story-item" v-for="item in storyList" :key="item.id" @click="viewStory(item)">
      <div class="title">{{ item.title }}</div>
      <div class="desc" v-html="item.content"></div>
      <div class="time">{{ $filters.formatTime(item.createAt) }}</div>
    </div>
    <div class="page">
      <a-pagination
        size="small"
        v-model:current="pagination.current"
        :total="pagination.total"
        @change="handleTableChange"
      />
    </div>
  </div>
  <a-modal v-model:open="open" :title="storyData.title">
    <div v-html="storyData.content"></div>
    <div style="text-align: right; padding-top: 5px">
      {{ $filters.formatTime(storyData.createAt) }}&nbsp;
    </div>
    <template #footer></template>
  </a-modal>
</template>
<style lang="scss" scoped>
.story-list {
  overflow: hidden;
  border-radius: 10px;
  background-color: var(--background-color);
  .story-item {
    cursor: pointer;
    padding: 20px;
    padding-bottom: 10px;
    transition: all 0.3s;
    color: var(--text-color);
    border-bottom: 1px solid var(--tabs-border-bottom-color);
    &:hover {
      background-color: var(--tabs-border-bottom-color);
    }
    .title {
      font-weight: bold;
      font-size: 16px;
    }
    .desc {
      margin: 10px 0;
      color: var(--text-color2);
      overflow: hidden;
      line-height: 1.3;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      p {
        margin: 0;
      }
    }
    .time {
      color: var(--text-color2);
      text-align: right;
    }
  }
  .page {
    padding: 20px;
    text-align: right;
  }
}
</style>
