<script setup lang="ts">
import { CustomForm } from "@/components"
import { ControlTableColumnsBtn } from "@/components"
import { ref } from "vue"
import api from "@/service/api"
import type { IForm } from "@/components/customForm/types"

const selectData = ref<any[]>([])
setTimeout(() => {
  selectData.value = [
    {
      value: "jack",
      label: "Jack"
    },
    {
      value: "disabled",
      label: "Disabled",
      disabled: true
    }
  ]
}, 1000)
const formConfig = ref<IForm>({
  formItems: [
    {
      filed: "username",
      type: "input",
      name: "username",
      label: "用户名",
      options: {
        placeholder: "请输入用户名"
      }
    },
    {
      filed: "role",
      type: "select",
      name: "role",
      label: "角色",
      options: {
        placeholder: "请选择角色",
        options: selectData
      }
    },
    {
      filed: "favorite",
      type: "radio",
      name: "favorite",
      label: "水果",
      options: {
        options: [
          { label: "Apple", value: "Apple" },
          { label: "Pear", value: "Pear" }
        ]
      }
    },
    {
      filed: "date",
      type: "datePicker",
      name: "date",
      label: "日期"
    }
  ]
})
const formData = ref({
  username: "",
  role: "",
  favorite: "",
  date: []
})

const userList = ref<any>([])
const getUserInfo = () => {
  api
    .getUserList({
      offset: 0,
      size: 10
    })
    .then((res) => {
      const { list } = res.data
      userList.value = list
    })
}
getUserInfo()
const columns = [
  {
    title: "#",
    width: 40,
    dataIndex: "index",
    align: "center"
  },
  {
    title: "用户名",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "真实姓名",
    dataIndex: "realname",
    align: "center"
  },
  {
    title: "手机号",
    dataIndex: "cellphone",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "enable",
    align: "center"
  },
  {
    title: "创建时间",
    dataIndex: "createAt",
    align: "center"
  },
  {
    title: "更新时间",
    dataIndex: "updateAt",
    align: "center"
  }
]
const tableColumns = ref<any[]>([])
</script>
<template>
  <div>
    <CustomForm v-bind="formConfig" v-model="formData" />
    <div class="mt-20">
      <div class="options">
        <ControlTableColumnsBtn :columns="columns" v-model:tableColumns="tableColumns" />
      </div>
      <a-table :columns="tableColumns" :dataSource="userList">
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'index'">
            {{ index + 1 }}
          </template>
          <template v-if="column.dataIndex === 'enable'">
            <span>
              <a-switch
                size="small"
                checked-children="启用"
                un-checked-children="禁用"
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
        </template>
      </a-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mt-20 {
  margin-top: 20px;
}
.options {
  text-align: right;
  margin-bottom: 10px;
}
</style>
