<script setup lang="ts">
import { roleListSearchFormItems, roleListColumns } from "./config"
import { reactive, ref } from "vue"
import { ControlTableColumnsBtn, CustomForm } from "@/components"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue"
import { useI18n } from "vue-i18n"
import AddRole from "./components/AddRole.vue"
import api from "@/service/api"
import usePermissions from "@/hooks/usePermissions"
import type { IForm, IFormItems } from "@/components/customForm/types"

const { t } = useI18n()
const formConfig = ref<IForm>({
  formName: "roleList",
  formItems: roleListSearchFormItems as unknown as IFormItems[],
  formLabelCol: {
    sm: { span: 8 }
  }
})
const formData = ref({
  name: "",
  intro: ""
})

const roleList = ref<any>([])
const tableColumns = ref<any[]>([])
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10
})
const getRoleList = () => {
  api
    .getRoleList(
      {
        offset: pagination.pageSize * pagination.current - pagination.pageSize,
        size: pagination.pageSize,
        ...formData.value
      },
      {
        showLoading: true
      }
    )
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

const dialog = ref(false)
const dialogTitle = ref("")
const info = ref({})
const addRole = () => {
  dialog.value = true
  dialogTitle.value = t("role.addRole")
  info.value = {}
}
const delRole = (id: number) => {
  api.delRole(id).then(() => {
    getRoleList()
  })
}
const editRole = (data: any) => {
  dialog.value = true
  dialogTitle.value = t("role.editRole")
  info.value = data
}
const isCreate = usePermissions("users", "create")
const isUpdate = usePermissions("users", "update")
const isDelete = usePermissions("users", "delete")
const isQuery = usePermissions("users", "query")
</script>
<template>
  <div>
    <div class="search-form" v-if="isQuery">
      <CustomForm
        v-bind="formConfig"
        v-model="formData"
        @submit="getRoleList"
        @reset="getRoleList"
      />
    </div>
    <div class="mt-20">
      <div class="options">
        <a-button class="mr-10" type="primary" size="small" @click="addRole" v-if="isCreate">{{
          $t("form.add")
        }}</a-button>
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
              <a-button size="small" type="link" @click="editRole(record)" v-if="isUpdate"
                ><EditOutlined />{{ $t("form.edit") }}</a-button
              >
              <a-button size="small" type="link" danger @click="delRole(record.id)" v-if="isDelete">
                <DeleteOutlined />
                {{ $t("form.delete") }}</a-button
              >
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <AddRole v-model="dialog" :title="dialogTitle" :info="info" @getList="getRoleList" />
  </div>
</template>
<style lang="scss" scoped></style>
