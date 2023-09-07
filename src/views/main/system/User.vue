<script setup lang="ts">
import { CustomForm } from "@/components"
import { ref } from "vue"
import { IForm } from "@/components/types"

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
      type: "input",
      name: "username",
      label: "用户名",
      options: {
        placeholder: "请输入用户名"
      }
    },
    {
      type: "select",
      name: "role",
      label: "角色",
      options: {
        placeholder: "请选择角色",
        options: selectData
      }
    },
    {
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
      type: "datePicker",
      name: "date",
      label: "日期"
    }
  ]
})
</script>
<template>
  <div>
    <CustomForm v-bind="formConfig" />
  </div>
</template>
<style lang="scss" scoped></style>
