<script setup lang="ts">
import { PropType, ref } from "vue"
import { IFormItems, IColStyle } from "./types"

defineProps({
  formItems: {
    type: Object as PropType<IFormItems[]>,
    default: () => {},
    required: true
  },
  colStyle: {
    type: Object as PropType<IColStyle>,
    default: () => ({
      xs: 24,
      sm: 12,
      md: 12,
      lg: 8,
      xl: 6,
      xxl: 4
    })
  },
  formLabelCol: {
    type: Object,
    default: () => ({
      sm: { span: 5 },
      xxl: { span: 8 }
    })
  }
})

const formState = ref()
</script>
<template>
  <a-form :model="formState" name="basic" autocomplete="off">
    <a-row>
      <a-col v-bind="colStyle" v-for="(item, index) in formItems" :key="index">
        <a-form-item
          :label="item.label"
          :name="item.name"
          :rules="item.rules"
          :labelCol="formLabelCol"
        >
          <template v-if="item.type === 'input'">
            <a-input v-bind="item.options" />
          </template>
          <template v-if="item.type === 'select'">
            <a-select v-bind="item.options" />
          </template>
          <template v-if="item.type === 'radio'">
            <a-radio-group v-bind="item.options" />
          </template>
          <template v-if="item.type === 'datePicker'">
            <a-range-picker v-bind="item.options" />
          </template>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>
<style lang="scss" scoped></style>
