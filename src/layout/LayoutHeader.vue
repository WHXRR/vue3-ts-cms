<script setup lang="ts">
import { ref } from "vue"
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons-vue"
import HeaderTabs from "@/components/headerTabs/HeaderTabs.vue"
import Language from "./components/Language.vue"
import SwitchTheme from "./components/SwitchTheme.vue"
import UserInfo from "./components/UserInfo.vue"

const isFullScreen = ref(false)
const fullScreen = () => {
  isFullScreen.value = !isFullScreen.value
  const app = document.getElementById("app")
  if (isFullScreen.value) {
    app?.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>
<template>
  <div class="layout-header">
    <HeaderTabs />
    <Language />
    <div class="pointer" @click="fullScreen">
      <FullscreenOutlined v-show="!isFullScreen" />
      <FullscreenExitOutlined v-show="isFullScreen" />
    </div>
    <SwitchTheme />
    <UserInfo />
  </div>
</template>
<style lang="scss" scoped>
.layout-header {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px;
}
</style>
