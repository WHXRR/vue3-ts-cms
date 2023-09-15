<script setup lang="ts">
import { goodsListColumns } from "./config"
import { reactive, ref } from "vue"
import { ControlTableColumnsBtn } from "@/components"
import api from "@/service/api"

const roleList = ref<any>([])
const tableColumns = ref<any[]>([])
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10
})
const getGoodsInfo = () => {
  api
    .getGoodsList({
      offset: pagination.pageSize * pagination.current - pagination.pageSize,
      size: pagination.pageSize
    })
    .then((res) => {
      const { list, totalCount } = res.data
      roleList.value = list
      pagination.total = totalCount
    })
}
const handleTableChange = (pag: { pageSize: number; current: number }) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  getGoodsInfo()
}
getGoodsInfo()
</script>
<template>
  <div>
    <div class="options">
      <ControlTableColumnsBtn :columns="goodsListColumns" v-model:tableColumns="tableColumns" />
    </div>
    <a-table
      :columns="tableColumns"
      :dataSource="roleList"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'index'">
          {{ index + 1 }}
        </template>
        <template v-if="column.dataIndex === 'imgUrl'">
          <a-image :width="80" :src="record.imgUrl" />
        </template>
        <template v-if="column.dataIndex === 'status'">
          <span>
            <a-switch
              :checked-children="$t('form.start')"
              :un-checked-children="$t('form.disable')"
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="record.status"
            />
          </span>
        </template>
        <template v-if="['createAt', 'updateAt'].includes(column.dataIndex)">
          <span>
            {{ $filters.formatTime(record[column.dataIndex]) }}
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>
<style lang="scss" scoped></style>
