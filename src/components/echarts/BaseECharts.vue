<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useSystemStore } from "@/stores/system"
import useECharts from "@/hooks/useECharts"

const systemStore = useSystemStore()
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: any
  }>(),
  {
    width: "100%",
    height: "300px"
  }
)
const baseECharts = ref<HTMLElement>()
const MyECharts = ref()
watch(
  () => systemStore.systemTheme,
  () => {
    MyECharts.value.dispostECharts()
    const { echartsMethods } = useECharts(baseECharts.value!, systemStore.systemTheme)
    MyECharts.value = echartsMethods
    MyECharts.value.setOption({
      ...props.options,
      backgroundColor: systemStore.systemThemeColor.bgColor
    })
  }
)

onMounted(() => {
  const { echartsMethods } = useECharts(baseECharts.value!, systemStore.systemTheme)
  MyECharts.value = echartsMethods
  MyECharts.value.setOption({
    ...props.options,
    backgroundColor: systemStore.systemThemeColor.bgColor
  })
})

watch(
  () => props.options,
  (newValue) => {
    MyECharts.value.setOption({
      ...newValue,
      backgroundColor: systemStore.systemThemeColor.bgColor
    })
  },
  {
    deep: true
  }
)

defineExpose({
  MyECharts
})
</script>
<template>
  <div>
    <div class="MyECharts-item" ref="baseECharts" :style="{ width, height }"></div>
  </div>
</template>
<style lang="scss" scoped></style>
