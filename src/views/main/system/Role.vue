<script setup lang="ts">
import { roleListColumns } from "./config"
import { reactive, ref } from "vue"
import { ControlTableColumnsBtn } from "@/components"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue"
import api from "@/service/api"

const roleList = ref<any>([])
const tableColumns = ref<any[]>([])
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10
})
const getRoleList = () => {
  api
    .getRoleList({
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
  getRoleList()
}
getRoleList()

const delRole = (id) => {}
</script>
<template>
  <div>
    <div class="options">
      <ControlTableColumnsBtn :columns="roleListColumns" v-model:tableColumns="tableColumns" />
    </div>
    <a-table
      :columns="tableColumns"
      :dataSource="roleList"
      :pagination="pagination"
      :scroll="{ x: 'max-content' }"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'index'">
          {{ index + 1 }}
        </template>
        <template v-if="column.dataIndex === 'enable'">
          <span>
            <a-switch
              :checked-children="$t('form.start')"
              :un-checked-children="$t('form.disable')"
              :checkedValue="1"
              :unCheckedValue="0"
              v-model:checked="record.enable"
            />
          </span>
        </template>
        <template v-if="['createAt', 'updateAt'].includes(column.dataIndex)">
          <span>
            {{ $filters.formatTime(record[column.dataIndex]) }}
          </span>
        </template>
        <template v-if="['action'].includes(column.dataIndex)">
          <a-space wrap>
            <a-button size="small" type="link"><EditOutlined />{{ $t("form.edit") }}</a-button>
            <a-button size="small" type="link" danger @click="delRole(record.id)">
              <DeleteOutlined />
              {{ $t("form.delete") }}</a-button
            >
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<style lang="scss" scoped></style>
