<script setup lang="ts">
import { ref } from "vue"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue"
import { menuListColumns } from "./config"
import api from "@/service/api"
import type { IMenu } from "./types"

const menuList = ref<any>([])
const getMenuList = () => {
  api.getMenuList().then((res) => {
    menuList.value = res.data.list
    function _mapToChild(item: IMenu) {
      if (Array.isArray(item)) {
        item.forEach((subItem) => {
          _mapToChild(subItem)
        })
      } else {
        if (item.children) {
          item.key = item.id
          item.children.forEach((subItem: IMenu) => {
            _mapToChild(subItem)
          })
        } else {
          item.key = item.id
        }
      }
    }
    _mapToChild(menuList.value)
  })
}
getMenuList()

const delMenu = (id) => {
  console.log(id)
}
</script>
<template>
  <div>
    <div class="options"></div>
    <a-table :columns="menuListColumns" :dataSource="menuList" :scroll="{ x: 'max-content' }">
      <template #bodyCell="{ column, record }">
        <template v-if="['createAt', 'updateAt'].includes(column.dataIndex)">
          <span>
            {{ $filters.formatTime(record[column.dataIndex]) }}
          </span>
        </template>
        <template v-if="['action'].includes(column.dataIndex)">
          <a-space wrap>
            <a-button size="small" type="link"><EditOutlined />{{ $t("form.edit") }}</a-button>
            <a-button size="small" type="link" danger @click="delMenu(record.id)">
              <DeleteOutlined />
              {{ $t("form.delete") }}
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<style lang="scss" scoped></style>
