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
      <a-layout-header
        style="padding: 0; height: auto; line-height: 1; background-color: rgba(255, 255, 255, 0.5)"
      >
        <LayoutHeader />
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <LayoutFooter />
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
