<script setup lang="ts">
import { computed } from "vue"
import { useI18n } from "vue-i18n"
import packageData from "@/assets/js/package.json.ts"
import tree from "@/assets/js/tree.ts"

const { t } = useI18n()
const textArr1 = computed(() => {
  const arr = []
  for (let i = 2; i < 20; i++) {
    arr.push({
      title: t(`home.text${i}`),
      content: t(`home.content${i - 1}`)
    })
  }
  return arr
})
</script>
<template>
  <div class="box-module-shadow box-item">
    <div class="title">{{ $t("home.title1") }}</div>
    <div class="content">
      {{ $t("home.text1") }}
    </div>
  </div>
  <div class="box-module-shadow box-item">
    <div class="title">{{ $t("home.title2") }}</div>
    <div class="content">
      <ul>
        <li class="li-item" v-for="(item, index) in textArr1" :key="index">
          <b>{{ item.title }}:</b> <a href="#">{{ item.content }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="box-module-shadow box-item">
    <div class="title">{{ $t("home.title3") }}</div>
    <div class="content">
      <a-descriptions bordered>
        <a-descriptions-item
          v-for="(item, index) in packageData"
          :key="index"
          :label="item.label"
          >{{ item.value }}</a-descriptions-item
        >
      </a-descriptions>
    </div>
  </div>
  <div class="box-module-shadow box-item">
    <div class="title">{{ $t("home.title4") }}</div>
    <div class="content">
      <pre>{{ tree }}</pre>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.box-item {
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  color: var(--text-color);
  background-color: var(--background-color);
  .title {
    padding-bottom: 20px;
    margin-bottom: 20px;
    font-weight: bold;
    border-bottom: 1px solid var(--tabs-border-bottom-color);
  }
  .li-item {
    padding: 5px 0;
  }
}
</style>
