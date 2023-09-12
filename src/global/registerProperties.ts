import type { App } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      formatTime: (value: string) => string
    }
  }
}
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      dayjs.extend(utc)
      return dayjs.utc(value).format("YYYY-MM-DD HH:mm:ss");
    }
  }
}
