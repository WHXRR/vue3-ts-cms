<script setup lang="ts">
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useSystemStore } from "@/stores/system"
import BaseECharts from "@/components/echarts/BaseECharts.vue"
import api from "@/service/api"
import * as echarts from "echarts"

const { t } = useI18n()
const systemStore = useSystemStore()
const option = computed(() => ({
  title: {
    text: t("analysis.AmountList"),
    left: "center"
  },
  grid: {
    left: "15%"
  },
  xAxis: {
    axisLabel: {
      inside: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    z: 10,
    data: xAxis.value
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: "#999"
    }
  },
  dataZoom: [
    {
      type: "inside"
    }
  ],
  series: [
    {
      name: "AmountList",
      type: "bar",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#f8dcda" },
          { offset: 1, color: systemStore.systemThemeColor.color }
        ])
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#f8dcda" },
            { offset: 1, color: systemStore.systemThemeColor.color }
          ])
        }
      },
      data: optionData.value
    }
  ]
}))
const xAxis = ref<string[]>([])
const optionData = ref<number[]>([])
const getAmountList = () => {
  api.getAmountList().then((res) => {
    xAxis.value = res.data.map((item) => item.title)
    optionData.value = res.data.map((item) => item.number1)
  })
}
getAmountList()
</script>
<template>
  <div>
    <BaseECharts :options="option" height="400px" />
  </div>
</template>
<style lang="scss" scoped></style>
