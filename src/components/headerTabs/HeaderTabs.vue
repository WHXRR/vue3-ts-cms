<script setup lang="ts">
import { useSystemStore } from "@/stores/system"
import { useRouter } from "vue-router"
import { MenuOutlined } from "@ant-design/icons-vue"

const router = useRouter()
const systemStore = useSystemStore()

const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action === "remove") {
    systemStore.systemHistoryRoutes = systemStore.systemHistoryRoutes.filter(
      (tab) => tab.url !== targetKey
    )
    if (targetKey === systemStore.currentTabs) {
      systemStore.currentTabs = systemStore.systemHistoryRoutes[0].url
      handleTabClick(systemStore.currentTabs)
    }
  }
}

const handleTabClick = (path: string) => {
  const tab = systemStore.systemHistoryRoutes.find((tab) => tab.url === path)
  router.push({
    path: tab?.url,
    query: tab?.query
  })
}

const closeAll = () => {
  systemStore.systemHistoryRoutes = systemStore.systemHistoryRoutes.splice(0, 1)
  systemStore.currentTabs = systemStore.systemHistoryRoutes[0].url
  handleTabClick(systemStore.currentTabs)
}
const closeOther = () => {
  systemStore.systemHistoryRoutes = systemStore.systemHistoryRoutes.filter(
    (tab) => tab.url === systemStore.currentTabs
  )
  systemStore.currentTabs = systemStore.systemHistoryRoutes[0].url
}
</script>
<template>
  <div class="route-tabs">
    <a-tabs
      v-model:activeKey="systemStore.currentTabs"
      hide-add
      type="editable-card"
      @edit="onEdit"
      @tabClick="handleTabClick"
    >
      <a-tab-pane
        v-for="pane in systemStore.systemHistoryRoutes"
        :key="pane.url"
        :tab="pane.name"
        :closable="systemStore.systemHistoryRoutes.length !== 1"
      >
      </a-tab-pane>
      <template #rightExtra>
        <a-dropdown placement="bottom">
          <a class="ant-dropdown-link" @click.prevent>
            <MenuOutlined :style="{ color: systemStore.systemThemeColor.color }" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="closeAll">{{ $t("menu.closeAll") }}</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="closeOther">{{ $t("menu.closeOther") }}</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
  </div>
</template>
<style lang="scss" scoped>
.route-tabs {
  flex: 1;
  overflow: hidden;
  :deep(.ant-tabs) {
    line-height: 1;
    font-family: fantasy;
  }
  :deep(.ant-tabs-nav) {
    margin-bottom: 0;
  }
  :deep(.ant-tabs-tab) {
    border-radius: 5px !important;
    padding: 8px 20px;
    font-size: 12px;
  }
  :deep(.ant-tabs-tab-active) {
    border-color: var(--color);
    border-bottom-color: var(--color) !important;
    .ant-tabs-tab-remove {
      color: var(--color);
    }
  }
  :deep(.ant-tabs-nav::before) {
    border-bottom-color: transparent;
  }
}
</style>
