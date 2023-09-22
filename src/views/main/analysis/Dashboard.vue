<script setup lang="ts">
import CategoryCount from "./components/CategoryCount.vue"
</script>
<template>
  <div>
    <a-row :gutter="[10, 10]">
      <a-col :xs="24" :sm="12" :xl="8" :xxl="6" :span="6">
        <div class="box-module-shadow echarts-item">
          <CategoryCount />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<style lang="scss" scoped>
.echarts-item {
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: var(--background-color);
}
</style>
