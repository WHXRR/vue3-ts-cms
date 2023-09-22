<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
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
const echarts = ref()
const bgColor = computed(() => (systemStore.systemTheme === "light" ? "#ffffff" : "#1b1c21"))
watch(
  () => systemStore.systemTheme,
  (val) => {
    echarts.value.dispose()
    const { echartsInstance, setOption } = useECharts(baseECharts.value!, val)
    echarts.value = echartsInstance
    setOption({
      ...props.options,
      backgroundColor: bgColor.value
    })
  }
)
onMounted(() => {
  const { echartsInstance, setOption } = useECharts(baseECharts.value!, systemStore.systemTheme)
  echarts.value = echartsInstance
  setOption({
    ...props.options,
    backgroundColor: bgColor.value
  })
})

watch(
  () => props.options,
  (newValue) => {
    echarts.value.setOption({
      ...newValue,
      backgroundColor: bgColor.value
    })
  },
  {
    deep: true
  }
)
</script>
<template>
  <div>
    <div class="echarts-item" ref="baseECharts" :style="{ width, height }"></div>
  </div>
</template>
<style lang="scss" scoped></style>
