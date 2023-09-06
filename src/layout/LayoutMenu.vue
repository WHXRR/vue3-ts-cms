<script setup lang="ts">
import { ref } from "vue"
import { UserOutlined } from "@ant-design/icons-vue"
import { useUserInfoStore } from "@/stores/user"

const selectedKeys = ref<string[]>(["1"])
const userInfoStore = useUserInfoStore()
</script>
<template>
  <div class="logo" />
  <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
    <template v-for="item in userInfoStore.userMenus" :key="item.id">
      <template v-if="item.type === 1">
        <a-sub-menu :key="item.id">
          <template #title>
            <span>
              <user-outlined />
              <span>{{ item.name }}</span>
            </span>
          </template>
          <template v-for="ele in item.children" :key="ele.id">
            <a-menu-item :kel="ele.id" @click="$router.push(ele.url)">
              <span>{{ ele.name }}</span>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
      <template v-else>
        <a-menu-item :kel="item.id">
          <span>{{ item.name }}</span>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>
<style lang="scss" scoped></style>
