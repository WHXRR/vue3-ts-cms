<script setup lang="ts">
import { onMounted, ref } from "vue"
import * as echarts from "echarts/core"
import { BarChart } from "echarts/charts"
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from "echarts/components"
import { LabelLayout, UniversalTransition } from "echarts/features"
import { CanvasRenderer } from "echarts/renderers"

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

const echarts1 = ref()
onMounted(() => {
  var myChart = echarts.init(echarts1.value)
  myChart.setOption({
    // ...
  })
})
</script>
<template>
  <div id="main" ref="echarts1"></div>
</template>
<style lang="scss" scoped></style>
