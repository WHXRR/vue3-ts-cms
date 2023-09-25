<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from "vue"
import { useI18n } from "vue-i18n"
import { useSystemStore } from "@/stores/system"
import BaseECharts from "@/components/echarts/BaseECharts.vue"
import api from "@/service/api"

const { t } = useI18n()
const systemStore = useSystemStore()
const xAxis = ref<string[]>([])
const optionData = ref<number[]>([])
const option = computed(() => ({
  title: {
    text: t("analysis.addressSale"),
    left: "center"
  },
  xAxis: {
    max: "dataMax"
  },
  yAxis: {
    type: "category",
    data: xAxis.value,
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 9
  },
  series: [
    {
      name: "addressSale",
      type: "bar",
      realtimeSort: true,
      label: {
        show: true,
        position: "right",
        valueAnimation: true
      },
      itemStyle: {
        color: systemStore.systemThemeColor.color
      },
      data: optionData.value
    }
  ],
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: "linear",
  animationEasingUpdate: "linear"
}))
const getAddressSale = () => {
  api.getAddressSale().then((res) => {
    xAxis.value = res.data.map((item) => item.address)
    optionData.value = res.data.map((item) => item.count)
  })
}
getAddressSale()

const baseECharts = ref()
const simulateDynamicData = () => {
  if (!optionData.value) return
  const arr = optionData.value
  for (var i = 0; i < optionData.value.length; ++i) {
    if (Math.random() > 0.9) {
      arr[i] += Math.round(Math.random() * 2000)
    } else {
      arr[i] += Math.round(Math.random() * 500)
    }
  }
  baseECharts.value.MyECharts.value?.setOption({
    series: [
      {
        type: "bar",
        data: optionData.value
      }
    ]
  })
}
let timer: number
if (optionData.value) {
  timer = setInterval(function () {
    simulateDynamicData()
  }, 3000)
}
onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
<template>
  <div>
    <BaseECharts
      :options="option"
      height="400px"
      v-model:optionData="optionData"
      ref="baseECharts"
    />
  </div>
</template>
<style lang="scss" scoped></style>
