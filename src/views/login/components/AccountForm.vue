<script setup lang="ts">
import { ref } from "vue"
import useCache from "@/utils/cache"

const accountFormRef = ref()
const accountFormState = ref({
  name: useCache.getItem("cmsAccount") ?? "coderwhy",
  password: useCache.getItem("cmsPassword") ?? "123456"
})

const validateForm = () => {
  return new Promise((resolve, reject) => {
    accountFormRef.value
      .validate()
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  })
}

const emit = defineEmits(["handleLogin"])
const handleLogin = () => {
  emit("handleLogin")
}

defineExpose({
  validateForm,
  accountFormState
})
</script>
<template>
  <a-form
    :model="accountFormState"
    ref="accountFormRef"
    :label-col="{ span: 6 }"
    :wrapper-col="{ span: 18 }"
    autocomplete="off"
  >
    <a-form-item label="账号" name="name" :rules="[{ required: true, message: '请输入账号!' }]">
      <a-input v-model:value="accountFormState.name" />
    </a-form-item>
    <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码!' }]">
      <a-input-password v-model:value="accountFormState.password" @keydown.enter="handleLogin" />
    </a-form-item>
  </a-form>
</template>
<style lang="scss" scoped></style>
