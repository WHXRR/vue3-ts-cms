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
const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  yAxis: {
    type: "value"
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)"
      }
    }
  ]
}

onMounted(() => {
  var myChart = echarts.init(echarts1.value)
  myChart.setOption(option)
})
</script>
<template>
  <div id="main" ref="echarts1" style="height: 500px"></div>
</template>
<style lang="scss" scoped></style>
