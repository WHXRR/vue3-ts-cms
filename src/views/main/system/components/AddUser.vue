<script setup lang="ts">
import { ref, computed } from "vue"
import { CustomForm } from "@/components"
import { userFormItems } from "./config"
import type { IForm } from "@/components/customForm/types"

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(["update:modelValue"])
const visible = computed({
  get: () => {
    return props.modelValue
  },
  set: (val) => {
    emit("update:modelValue", val)
  }
})

const formData = ref({
  name: "",
  realname: "",
  cellphone: "",
  password: ""
})
const formConfig = ref<IForm>({
  formItems: userFormItems as unknown as IFormItems[],
  colStyle: {
    sm: { span: 24 }
  },
  showCollapsed: false,
  showResetBtn: false
})

const submit = () => {
  console.log(formData)
}
</script>
<template>
  <div>
    <a-modal v-model:open="visible" :title="$t('user.addUser')">
      <CustomForm v-bind="formConfig" v-model="formData" @submit="submit" />
      <template #footer></template>
    </a-modal>
  </div>
</template>
<style lang="scss" scoped></style>
