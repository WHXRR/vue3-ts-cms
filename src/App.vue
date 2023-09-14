<script setup lang="ts">
import { useSystemStore } from "@/stores/system"
import { RouterView } from "vue-router"
import { theme } from "ant-design-vue"
import { computed } from "vue"
import "dayjs/locale/zh-cn"
import dayjs from "dayjs"
import zhCN from "ant-design-vue/es/locale/zh_CN"
import enUS from "ant-design-vue/es/locale/en_US"

dayjs.locale("zh-cn")
const systemStore = useSystemStore()
const systemTheme = computed(() =>
  systemStore.systemTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm
)
</script>

<template>
  <a-config-provider
    :locale="systemStore.systemLanguage === 'zh' ? zhCN : enUS"
    :theme="{
      algorithm: systemTheme,
      token: {
        colorPrimary: systemStore.systemThemeColor.color,
        colorBgBase: systemStore.systemThemeColor.bgColor
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
