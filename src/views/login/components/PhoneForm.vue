<script setup lang="ts">
import { ref } from "vue"
const phoneFormRef = ref()
const phoneFormState = ref({
  phone: "",
  code: ""
})

const validateForm = () => {
  return new Promise((resolve, reject) => {
    phoneFormRef.value
      .validate()
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  })
}
defineExpose({
  validateForm
})
</script>
<template>
  <a-form
    :model="phoneFormState"
    ref="phoneFormRef"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    autocomplete="off"
  >
    <a-form-item
      label="手机号"
      name="phone"
      :rules="[{ required: true, message: '请输入手机号!' }]"
    >
      <a-input v-model:value="phoneFormState.phone" />
    </a-form-item>
    <a-form-item label="验证码" name="code" :rules="[{ required: true, message: '请输入验证码!' }]">
      <a-input-group compact>
        <a-input v-model:value="phoneFormState.code" style="width: 56%" />
        <a-button type="primary">获取验证码</a-button>
      </a-input-group>
    </a-form-item>
  </a-form>
</template>
<style lang="scss" scoped></style>
