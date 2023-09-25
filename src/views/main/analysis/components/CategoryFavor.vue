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
    text: t("analysis.categoryFavor"),
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
      name: "categoryFavor",
      type: "pie",
      center: ["50%", "45%"],
      radius: ["20%", "45%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2
      },
      label: {
        show: false,
        position: "center"
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 15,
          fontWeight: "bold"
        }
      },
      labelLine: {
        show: false
      },
      data: optionData.value
    }
  ]
}))
const getCategoryFavor = () => {
  api.getCategoryFavor().then((res) => {
    optionData.value = res.data.map((item) => ({
      value: item.goodsFavor,
      name: item.name
    }))
  })
}
getCategoryFavor()
</script>
<template>
  <div>
    <BaseECharts :options="option" height="300px" />
  </div>
</template>
<style lang="scss" scoped></style>
