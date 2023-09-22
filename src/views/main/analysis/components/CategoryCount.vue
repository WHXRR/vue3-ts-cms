<script setup lang="ts">
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import BaseECharts from "@/components/echarts/BaseECharts.vue"
import api from "@/service/api"

interface IData {
  value: number
  name: string
}
const { t } = useI18n()
const optionData = ref<IData[]>([])
const option = computed(() => ({
  title: {
    text: t("analysis.categoryCount"),
    left: "center"
  },
  tooltip: {
    trigger: "item"
  },
  legend: {
    orient: "vertical",
    left: "left"
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: optionData.value,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
}))
const getCategoryCount = () => {
  api.getCategoryCount().then((res) => {
    optionData.value = res.data.map((item) => ({
      value: item.goodsCount,
      name: item.name
    }))
  })
}
getCategoryCount()
</script>
<template>
  <div>
    <BaseECharts :options="option" height="200px" />
  </div>
</template>
<style lang="scss" scoped></style>
