<script setup lang="ts">
import { ref } from "vue"
import LayoutMenu from "@/layout/LayoutMenu.vue"
import LayoutHeader from "@/layout/LayoutHeader.vue"
import LayoutFooter from "@/layout/LayoutFooter.vue"
import { RouterView } from "vue-router"

const collapsed = ref<boolean>(false)
</script>

<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible theme="light">
      <LayoutMenu />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding: 0; height: auto; line-height: 1">
        <LayoutHeader />
      </a-layout-header>
      <a-layout-content>
        <div style="padding: 10px; height: 100%">
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
.ant-layout-header {
  background: var(--background-color);
}
</style>
