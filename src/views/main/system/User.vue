<script setup lang="ts">
import { CustomForm } from "@/components"
import { ref } from "vue"
import { IForm } from "@/components/customForm/types"

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
</script>
<template>
  <div>
    <CustomForm v-bind="formConfig" v-model="formData" />
  </div>
</template>
<style lang="scss" scoped></style>
