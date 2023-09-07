<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { UserOutlined } from "@ant-design/icons-vue"
import { useUserInfoStore } from "@/stores/user"

const userInfoStore = useUserInfoStore()
const route = useRoute()
const router = useRouter()

const openKeys = ref<number[]>([])
const selectedKeys = ref<number[]>([])

const handleMenuClick = (data: any, id: number) => {
  router.push(data.url)
  openKeys.value = [id]
  selectedKeys.value = [data.id]
}

const getMenuKeys = (menus: any[]) => {
  for (let item of menus) {
    if (item.type !== 2 && item.children.length) {
      getMenuKeys(item.children)
    } else {
      if (item.url === route.path) {
        openKeys.value = [item.parentId]
        selectedKeys.value = [item.id]
        break
      }
    }
  }
}
getMenuKeys(userInfoStore.userMenus)
</script>
<template>
  <div class="logo" />
  <a-menu v-model:selectedKeys="selectedKeys" mode="inline" v-model:openKeys="openKeys">
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
            <a-menu-item :kel="ele.id" @click="handleMenuClick(ele, item.id)">
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
