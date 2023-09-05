<script setup lang="ts">
import LoginBox from "@/views/login/LoginBox.vue"
import { useSystemStore } from "@/stores/system"
const systemStore = useSystemStore()
</script>

<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#292929'
      }
    }"
  >
    <a-spin :spinning="systemStore.loading" wrapperClassName="loading-container">
      <LoginBox />
    </a-spin>
  </a-config-provider>
</template>

<style scoped lang="scss">
.loading-container {
  height: 100%;
  :deep(.ant-spin-spinning) {
    max-height: fit-content;
  }
  :deep(.ant-spin-container) {
    height: 100%;
  }
}
</style>
