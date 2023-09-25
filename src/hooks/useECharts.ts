import * as echarts from "echarts"
import type { EChartsOption } from "echarts"

function useECharts(el: HTMLElement, theme: string = 'light') {

  const echartsMethods = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setOption: (options: EChartsOption) => { },
    updateSize: () => { },
    dispostECharts: () => { }
  }
  const echartsInstance = echarts.init(el, theme)

  echartsMethods.setOption = (options: EChartsOption) => {
    echartsInstance.setOption(options)
  }

  echartsMethods.updateSize = () => {
    echartsInstance.resize()
  }

  echartsMethods.dispostECharts = () => {
    window.removeEventListener('resize', echartsMethods.updateSize)
    echartsInstance.dispose()
  }

  window.addEventListener('resize', echartsMethods.updateSize)

  return {
    echartsInstance,
    echartsMethods
  }
}
export default useECharts
