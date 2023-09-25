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
    top: "bottom"
  },
  series: [
    {
      name: "categoryCount",
      type: "pie",
      radius: "40%",
      center: ["50%", "45%"],
      data: optionData.value
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
    <BaseECharts :options="option" height="300px" />
  </div>
</template>
<style lang="scss" scoped></style>
