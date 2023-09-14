<script setup lang="ts">
import { FrownTwoTone, SmileTwoTone, MehTwoTone } from "@ant-design/icons-vue"
import { useSystemStore } from "@/stores/system"

const systemStore = useSystemStore()
</script>
<template>
  <div class="layout-footer">
    <FrownTwoTone class="footer-icon" :two-tone-color="systemStore.systemThemeColor.color" />
    <MehTwoTone class="footer-icon" :two-tone-color="systemStore.systemThemeColor.color" />
    <SmileTwoTone class="footer-icon" :two-tone-color="systemStore.systemThemeColor.color" />
  </div>
</template>
<style lang="scss" scoped>
.layout-footer {
  font-size: 25px;
  .footer-icon {
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
