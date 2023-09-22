import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

function useECharts(el: HTMLElement, theme: string = 'light') {

  const echartsInstance = echarts.init(el, theme)

  const setOption = (options: EChartsOption) => {
    echartsInstance.setOption(options)
  }

  const updateSize = () => {
    echartsInstance.resize()
  }

  window.addEventListener('resize', updateSize)

  return {
    echartsInstance,
    setOption,
    updateSize
  }
}
export default useECharts
