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
      :label="$t('form.cellphone')"
      name="phone"
      :rules="[{ required: true, message: $t('login.pleaseInputPhone') }]"
    >
      <a-input v-model:value="phoneFormState.phone" />
    </a-form-item>
    <a-form-item
      :label="$t('login.code')"
      name="code"
      :rules="[{ required: true, message: $t('login.pleaseInputCode') }]"
    >
      <a-input-group compact>
        <a-input v-model:value="phoneFormState.code" style="width: 56%" />
        <a-button type="primary">{{ $t("login.getCode") }}</a-button>
      </a-input-group>
    </a-form-item>
  </a-form>
</template>
<style lang="scss" scoped></style>
