<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { CustomForm } from "@/components"
import { roleFormItems } from "./config"
import { message } from "ant-design-vue"
import { useI18n } from "vue-i18n"
import { mapToMenuChildID } from "@/utils/mapToMenuChildID"
import api from "@/service/api"
import type { IForm, IFormItems } from "@/components/customForm/types"
import type { TreeProps } from "ant-design-vue"

const { t } = useI18n()
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  info: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(["update:modelValue", "getList"])
const visible = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit("update:modelValue", val)
  }
})

const formConfig = ref<IForm>({
  formItems: roleFormItems as unknown as IFormItems[],
  formName: "role",
  colStyle: {
    sm: 24
  },
  formLabelCol: { span: 4 },
  showCollapsed: false,
  showResetBtn: false,
  showSubmitBtn: false
})
interface IFormData {
  name: string
  intro: string
}
const formRef = ref()
const formData = ref({
  name: "",
  intro: ""
})
watch(
  () => props.info,
  (newValue) => {
    if (props.info.id) {
      checkedKeys.value = mapToMenuChildID(newValue.menuList)
      console.log(checkedKeys.value)
    } else {
      checkedKeys.value = []
    }
    Object.keys(formData.value).forEach((key) => {
      formData.value[key as keyof IFormData] = newValue[key]
    })
  }
)

const checkedKeys = ref<number[]>([])
const fieldNames: TreeProps["fieldNames"] = {
  title: "name",
  key: "id"
}
const menuList = ref<any>([])
const getMenuList = () => {
  api.getMenuList().then((res) => {
    menuList.value = res.data.list
  })
}
getMenuList()
const handleSubmit = () => {
  if (!checkedKeys.value.length) return message.warn(t("form.selectIntro"))
  formRef.value.submit()
}
const submit = async () => {
  const params = {
    ...formData.value,
    menuList: checkedKeys.value
  }
  if (props.info.id) {
    await api.editRole(params, props.info.id)
  } else {
    await api.addRole(params)
  }
  emit("getList")
  checkedKeys.value = []
  formRef.value.reset()
  visible.value = false
}
</script>
<template>
  <div>
    <a-modal v-model:open="visible" :title="title" destroyOnClose>
      <CustomForm v-bind="formConfig" v-model="formData" @submit="submit" ref="formRef" />
      <a-tree
        v-model:checkedKeys="checkedKeys"
        :tree-data="menuList"
        :field-names="fieldNames"
        checkable
      >
      </a-tree>
      <template #footer>
        <a-button type="primary" size="small" @click="handleSubmit">{{
          $t("form.submit")
        }}</a-button>
      </template>
    </a-modal>
  </div>
</template>
<style lang="scss" scoped></style>
