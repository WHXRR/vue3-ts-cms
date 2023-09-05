import { defineStore } from "pinia";
import { ref } from "vue";

export const useSystemStore = defineStore("system", () => {
  const loading = ref(false)
  return {
    loading
  }
})
