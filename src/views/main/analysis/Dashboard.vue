<script setup lang="ts">
import CategoryCount from "./components/CategoryCount.vue"
import CategorySale from "./components/CategorySale.vue"
import CategoryFavor from "./components/CategoryFavor.vue"
import AddressSale from "./components/AddressSale.vue"
import AmountList from "./components/AmountList.vue"
</script>
<template>
  <div>
    <a-row :gutter="[10, 10]">
      <a-col :xs="24" :sm="12" :xl="8">
        <div class="box-module-shadow echarts-item">
          <CategoryCount />
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :xl="8">
        <div class="box-module-shadow echarts-item">
          <CategorySale />
        </div>
      </a-col>
      <a-col :xs="24" :sm="12" :xl="8">
        <div class="box-module-shadow echarts-item">
          <CategoryFavor />
        </div>
      </a-col>
      <a-col :xs="24" :sm="12">
        <div class="box-module-shadow echarts-item">
          <AddressSale />
        </div>
      </a-col>
      <a-col :xs="24" :sm="12">
        <div class="box-module-shadow echarts-item">
          <AmountList />
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
