<script setup lang="ts">
import { useSystemStore } from "@/stores/system"
import { RouterView } from "vue-router"
import { theme } from "ant-design-vue"
import { computed } from "vue"
const systemStore = useSystemStore()
const systemTheme = computed(() =>
  systemStore.systemTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
)
</script>

<template>
  <a-config-provider
    :theme="{
      algorithm: systemTheme,
      token: {
        colorPrimary: systemStore.systemThemeColor
      }
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
