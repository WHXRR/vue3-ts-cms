<script setup lang="ts">
import { RouterView } from "vue-router"
import { useSystemStore } from "@/stores/system"
import LayoutMenu from "@/layout/LayoutMenu.vue"
import LayoutHeader from "@/layout/LayoutHeader.vue"
import LayoutFooter from "@/layout/LayoutFooter.vue"

const systemStore = useSystemStore()
const handleSiderCollapse = () => {
  systemStore.menuCollapsed = window.innerWidth < 768
}
window.addEventListener("resize", handleSiderCollapse)
handleSiderCollapse()
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="systemStore.menuCollapsed" collapsible theme="light">
      <LayoutMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding: 0; height: auto; line-height: 1">
        <LayoutHeader />
      </a-layout-header>
      <a-layout-content>
        <div class="layout-content">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <LayoutFooter />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="scss">
.ant-layout {
  height: 100%;
}
.ant-layout-header {
  background: var(--background-color);
}
.ant-layout-content {
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  padding: 20px 0 20px 20px;
  background-color: var(--content-background-color);
}
.ant-layout-footer {
  padding: 16px 50px;
  background: var(--background-color);
}
.layout-content {
  height: 100%;
  box-sizing: content-box;
  overflow: hidden;
  overflow-y: auto;
  padding-right: 20px;
  /* padding: 20px;
  background-color: var(--content-background-color); */
}
</style>
