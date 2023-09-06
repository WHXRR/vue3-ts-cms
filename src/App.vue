<script setup lang="ts">
import { useSystemStore } from "@/stores/system"
import { RouterView } from "vue-router"
import { theme } from "ant-design-vue"
const systemStore = useSystemStore()
</script>

<template>
  <!-- <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#292929'
      }
    }"
  >
    <a-spin :spinning="systemStore.loading" wrapperClassName="loading-container">
      <RouterView />
    </a-spin>
  </a-config-provider> -->
  <a-config-provider
    :theme="{
      algorithm: theme.defaultAlgorithm
    }"
  >
    <a-spin :spinning="systemStore.loading" wrapperClassName="loading-container">
      <RouterView />
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
