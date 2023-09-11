<script setup lang="ts">
import { CustomForm } from "@/components"
import { ref } from "vue"
import { IForm } from "@/components/customForm/types"
import api from "@/service/api"

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
      const { list, totalCount } = res.data
      userList.value = list
    })
}
getUserInfo()
const columns = [
  {
    title: "用户名",
    dataIndex: "name"
  },
  {
    title: "真实姓名",
    dataIndex: "realname"
  },
  {
    title: "手机号",
    dataIndex: "cellphone"
  },
  {
    title: "创建时间",
    dataIndex: "createAt"
  }
]
</script>
<template>
  <div>
    <CustomForm v-bind="formConfig" v-model="formData" />
    <div class="user-list box-module-shadow">
      <a-table :columns="columns" :dataSource="userList"> </a-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.user-list {
  margin-top: 20px;
}
</style>
