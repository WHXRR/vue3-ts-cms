<script setup lang="ts">
import { ControlTableColumnsBtn, CustomForm } from "@/components"
import { computed, reactive, ref, watchEffect } from "vue"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons-vue"
import { userListColumns, userListSearchFormItems } from "./config"
import { useI18n } from "vue-i18n"
import AddUser from "./components/AddUser.vue"
import useCache from "@/utils/cache"
import api from "@/service/api"
import type { IForm, IFormItems } from "@/components/customForm/types"

const { t } = useI18n()
const btnText = computed(() => t("form.search"))
const formConfig = ref<IForm>({
  formName: "userList",
  formItems: userListSearchFormItems as unknown as IFormItems[],
  formLabelCol: {
    sm: { span: 8 }
  },
  submitBtnText: btnText
})
const formData = ref({
  name: "",
  realname: "",
  cellphone: "",
  enable: ""
})

const userList = ref<any>([])
// 表格的列数据
const tableColumns = ref<any[]>([])
// checkbox的列数据，初始化时哪个是选中哪些是不选中
const initTableColumns = ref(useCache.getItem("useListColumns") || [])
// 将表格列的显隐与排序进行存储，刷新时任然保持上一次的状态
watchEffect(() => {
  useCache.setItem("useListColumns", initTableColumns.value)
})
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: 10
})
const getUserList = () => {
  api
    .getUserList({
      offset: pagination.pageSize * pagination.current - pagination.pageSize,
      size: pagination.pageSize,
      ...formData.value
    })
    .then((res) => {
      const { list, totalCount } = res.data
      userList.value = list
      pagination.total = totalCount
    })
}
const handleTableChange = (pag: { pageSize: number; current: number }) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  getUserList()
}
getUserList()

const delUser = (id: number) => {
  api.delUser(id).then((res) => {
    if (!res.code) {
      getUserList()
    }
  })
}

const addUserDialog = ref(false)
const dialogTitle = ref("")
const addUser = () => {
  addUserDialog.value = true
  dialogTitle.value = t("user.addUser")
  userInfo.value = {}
}
const userInfo = ref({})
const editUser = (data: any) => {
  addUserDialog.value = true
  dialogTitle.value = t("user.editUser")
  userInfo.value = data
}
</script>
<template>
  <div>
    <div class="search-form">
      <CustomForm
        v-bind="formConfig"
        v-model="formData"
        @submit="getUserList"
        @reset="getUserList"
      />
    </div>
    <div class="mt-20">
      <div class="options">
        <a-button type="primary" size="small" class="mr-10" @click="addUser">{{
          $t("form.add")
        }}</a-button>
        <ControlTableColumnsBtn
          :columns="userListColumns"
          v-model:tableColumns="tableColumns"
          v-model:initTableColumns="initTableColumns"
        />
      </div>
      <a-table
        :columns="tableColumns"
        :dataSource="userList"
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
              <a-button size="small" type="link" @click="editUser(record)"
                ><EditOutlined />{{ $t("form.edit") }}</a-button
              >
              <a-button size="small" type="link" danger @click="delUser(record.id)">
                <DeleteOutlined />
                {{ $t("form.delete") }}</a-button
              >
            </a-space>
          </template>
        </template>
      </a-table>
    </div>
    <AddUser
      v-model="addUserDialog"
      @getList="getUserList"
      :title="dialogTitle"
      :userInfo="userInfo"
    />
  </div>
</template>
<style lang="scss" scoped></style>
