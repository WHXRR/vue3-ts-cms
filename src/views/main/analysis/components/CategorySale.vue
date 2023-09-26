<script setup lang="ts">
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import { BaseECharts } from "@/components"
import api from "@/service/api"

interface IData {
  value: number
  name: string
}
const { t } = useI18n()
const optionData = ref<IData[]>([])
const option = computed(() => ({
  title: {
    text: t("analysis.categorySale"),
    left: "center"
  },
  legend: {
    top: "bottom"
  },
  series: [
    {
      name: "categorySale",
      type: "pie",
      data: optionData.value,
      radius: [20, 70],
      center: ["50%", "45%"],
      roseType: "area",
      itemStyle: {
        borderRadius: 8
      }
    }
  ]
}))
const getCategorySale = () => {
  api.getCategorySale().then((res) => {
    optionData.value = res.data.map((item) => ({
      value: item.goodsCount,
      name: item.name
    }))
  })
}
getCategorySale()
</script>
<template>
  <div>
    <BaseECharts :options="option" height="300px" />
  </div>
</template>
<style lang="scss" scoped></style>
