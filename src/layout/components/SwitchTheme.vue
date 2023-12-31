<script setup lang="ts">
import { useSystemStore } from "@/stores/system"
import Icon from "@ant-design/icons-vue"
import setCssVar from "@/hooks/useSwitchTheme"
import { ref } from "vue"

declare global {
  interface Document {
    startViewTransition: Function
  }
}

const systemStore = useSystemStore()
const changeTheme = async (val: string) => {
  if (!document.startViewTransition) {
    return setCssVar(val)
  }
  const vt = document.startViewTransition(() => setCssVar(val))
  await vt.ready
  const radius = Math.hypot(window.innerWidth, window.innerHeight)
  const frameConfig = {
    clipPath: [
      `circle(0 at ${window.innerWidth}px ${0}px)`,
      `circle(${radius}px at ${window.innerWidth}px ${0}px)`
    ] // 圆形
  }
  const timingConfig = {
    duration: 400,
    pseudoElement: "::view-transition-new(root)"
  }
  document.documentElement.animate(frameConfig, timingConfig)
}

const theme = ref(systemStore.systemTheme)
</script>
<template>
  <div class="switch-theme">
    <a-switch
      v-model:checked="theme"
      checkedValue="light"
      unCheckedValue="dark"
      @change="changeTheme"
    >
      <template #checkedChildren>
        <icon>
          <template #component>
            <svg
              t="1694595123776"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9565"
              width="1.1em"
              height="1.1em"
            >
              <path
                d="M344.189719 297.542353l-57.889397-57.889397-48.231443 48.232466 57.889397 57.889397L344.189719 297.542353zM254.129654 480.812217l-96.462886 0L157.666768 545.103411l96.462886 0L254.129654 480.812217zM543.518311 162.503932l-64.291194 0 0 93.214915 64.291194 0L543.518311 162.503932zM784.677572 287.885422l-48.231443-48.232466-57.89042 57.889397 45.031568 45.027474L784.677572 287.885422zM678.555709 728.42137l57.89042 57.841302 45.07557-44.982449-57.934423-57.885304L678.555709 728.42137zM768.614751 545.103411l96.464932 0 0-64.291194-96.464932 0L768.614751 545.103411zM511.397785 320.009018c-106.116747 0-192.926795 86.855073-192.926795 192.927818 0 106.113677 86.810048 192.923725 192.926795 192.923725 106.11777 0 192.923725-86.810048 192.923725-192.923725C704.32151 406.864091 617.515555 320.009018 511.397785 320.009018M479.227117 863.459791l64.291194 0 0-93.259941-64.291194 0L479.227117 863.459791zM238.068879 738.030205l48.231443 48.231443 57.889397-57.841302-44.982449-45.027474L238.068879 738.030205z"
                fill="currentColor"
                p-id="9566"
              ></path>
            </svg>
          </template>
        </icon>
      </template>
      <template #unCheckedChildren>
        <icon>
          <template #component>
            <svg
              t="1694595305776"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10652"
              width="0.8em"
              height="0.8em"
            >
              <path
                d="M529.611373 1023.38565c-146.112965 0-270.826063-51.707812-374.344078-155.225827C51.74928 764.641808 0.041469 639.826318 0.041469 493.815745c0-105.053891 29.693595-202.326012 88.978393-292.22593 59.38719-89.797526 137.000103-155.942569 232.83874-198.63991 6.041111-4.607627 12.184613-3.788493 18.225724 2.252618 7.576986 4.607627 9.931996 11.365479 6.860244 20.580733C322.677735 83.736961 310.493122 142.202626 310.493122 201.589815c0 135.464227 48.328885 251.474031 144.986656 348.131801 96.657771 96.657771 212.667574 144.986656 348.131801 144.986656 74.541162 0 139.252721-11.365479 194.032283-34.19883C1003.684974 655.799424 1009.726084 656.618558 1015.767195 662.659669c7.576986 4.607627 9.931996 11.365479 6.860244 20.580733C983.104241 786.758417 918.802249 869.286132 829.721465 930.925939 740.743072 992.565746 640.706375 1023.38565 529.611373 1023.38565z"
                fill="currentColor"
                p-id="10653"
              ></path>
            </svg>
          </template>
        </icon>
      </template>
    </a-switch>
  </div>
</template>
<style lang="scss" scoped>
.switch-theme {
  :deep(.ant-switch-inner-unchecked) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
