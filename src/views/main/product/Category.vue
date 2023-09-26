<script setup lang="ts">
import { categoryListColumns, categoryListSearchFormItems } from "./config"
import { reactive, ref, computed } from "vue"
import { ControlTableColumnsBtn, CustomForm } from "@/components"
import { useI18n } from "vue-i18n"
import api from "@/service/api"
import type { IForm, IFormItems } from "@/components/customForm/types"

const { t } = useI18n()
const btnText = computed(() => t("form.search"))
const formConfig = ref<IForm>({
  formName: "categoryList",
  formItems: categoryListSearchFormItems as unknown as IFormItems[],
  formLabelCol: {
    sm: { span: 8 }
  },
  submitBtnText: btnText
})
const formData = ref({
  name: ""
})

const roleList = ref<any>([])
const tableColumns = ref<any[]>([])
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10
})
const getCategoryList = () => {
  api
    .getCategoryList({
      ...formData.value,
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
  getCategoryList()
}
getCategoryList()
</script>
<template>
  <div>
    <div class="search-form">
      <CustomForm
        v-bind="formConfig"
        v-model="formData"
        @submit="getCategoryList"
        @reset="getCategoryList"
      />
    </div>
    <div class="options mt-20">
      <ControlTableColumnsBtn :columns="categoryListColumns" v-model:tableColumns="tableColumns" />
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
