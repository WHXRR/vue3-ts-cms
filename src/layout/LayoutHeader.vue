<script setup lang="ts">
import { UserOutlined } from "@ant-design/icons-vue"
import { useUserInfoStore } from "@/stores/user"
import { useSystemStore } from "@/stores/system"
import { FrownOutlined, SmileOutlined } from "@ant-design/icons-vue"
import setCssVar from "@/utils/useSwitchTheme"

const userInfoStore = useUserInfoStore()
const systemStore = useSystemStore()

const changeTheme = (val: string) => {
  setCssVar(val)
}
</script>
<template>
  <div class="layout-header">
    <a-switch
      v-model:checked="systemStore.systemTheme"
      checkedValue="dark"
      unCheckedValue="light"
      @change="changeTheme"
    >
      <template #checkedChildren><FrownOutlined /></template>
      <template #unCheckedChildren><SmileOutlined /></template>
    </a-switch>
    <a-popover placement="bottom">
      <template #content>
        <p style="margin-bottom: 5px">电话：{{ userInfoStore.userInfo.cellphone }}</p>
        <p style="margin-bottom: 5px">部门：{{ userInfoStore.userInfo.department.name }}</p>
      </template>
      <template #title>
        <span>{{ userInfoStore.userInfo.role.name }}</span>
      </template>
      <div class="user-menu">
        <a-avatar style="background-color: #87d068">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
        <b class="user-name">{{ userInfoStore.userInfo.name }}</b>
      </div>
    </a-popover>
  </div>
</template>
<style lang="scss" scoped>
.layout-header {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 20px;
  .user-menu {
    cursor: pointer;
  }
  .user-name {
    padding-left: 10px;
  }
}
</style>
