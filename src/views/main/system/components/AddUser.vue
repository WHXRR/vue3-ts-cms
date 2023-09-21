<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { CustomForm } from "@/components"
import { userFormItems } from "./config"
import { useI18n } from "vue-i18n"
import api from "@/service/api"
import type { IForm, IFormItems } from "@/components/customForm/types"

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
  userInfo: {
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

interface IFormData {
  name: string
  realname: string
  cellphone: string
  password: string
  departmentId: string
  roleId: string
}
const formRef = ref()
const formData = ref({
  name: "",
  realname: "",
  cellphone: "",
  password: "",
  departmentId: "",
  roleId: ""
})
const formConfig = ref<IForm>({
  formItems: userFormItems as unknown as IFormItems[],
  formName: "user",
  colStyle: {
    sm: 24
  },
  showCollapsed: false,
  showResetBtn: false
})
watch(
  () => props.userInfo,
  (newValue) => {
    const passwordItem = formConfig.value.formItems.find((item) => item.filed === "password")
    if (newValue.id) {
      passwordItem!.hidden = true
    } else {
      passwordItem!.hidden = false
    }
    Object.keys(formData.value).forEach((key) => {
      formData.value[key as keyof IFormData] = newValue[key]
    })
  }
)

const submit = async () => {
  if (props.title === t("user.addUser")) {
    await api.addUser(formData.value)
  } else {
    await api.editUser(formData.value, props.userInfo.id)
  }
  emit("getList")
  formRef.value.reset()
  visible.value = false
}
</script>
<template>
  <div>
    <a-modal v-model:open="visible" :title="title" destroyOnClose>
      <CustomForm v-bind="formConfig" v-model="formData" @submit="submit" ref="formRef" />
      <template #footer></template>
    </a-modal>
  </div>
</template>
<style lang="scss" scoped></style>
