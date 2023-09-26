<script setup lang="ts">
import { ref } from "vue"
import useCache from "@/utils/cache"

const accountFormRef = ref()
const accountFormState = ref({
  name: useCache.getItem("cmsAccount") ?? "root",
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
    <a-form-item
      :label="$t('login.userName')"
      name="name"
      :rules="[{ required: true, message: $t('login.pleaseInputAccount') }]"
    >
      <a-input v-model:value="accountFormState.name" />
    </a-form-item>
    <a-form-item
      :label="$t('login.password')"
      name="password"
      :rules="[{ required: true, message: $t('login.pleaseInputPassword') }]"
    >
      <a-input-password v-model:value="accountFormState.password" @keydown.enter="handleLogin" />
    </a-form-item>
  </a-form>
</template>
<style lang="scss" scoped></style>
