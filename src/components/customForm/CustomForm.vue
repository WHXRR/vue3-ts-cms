<script setup lang="ts">
import { watch, ref } from "vue"
import type { IFormItems, IColStyle } from "./types"
import type { PropType } from "vue"

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
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
  },
  submitBtnText: {
    type: String,
    default: ""
  },
  showSubmitBtn: {
    type: Boolean,
    default: true
  },
  showResetBtn: {
    type: Boolean,
    default: true
  },
  fixed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["update:modelValue", "submit", "reset"])
const formRef = ref()
const formData = ref({ ...props.modelValue })
watch(
  () => formData.value,
  (newValue) => {
    emit("update:modelValue", newValue)
  },
  {
    deep: true
  }
)
const submit = () => {
  emit("submit")
}
const reset = () => {
  formRef.value.resetFields()
  emit("reset")
}
</script>
<template>
  <div :class="['custom-form', fixed ? 'fixed' : '']">
    <a-form name="basic" autocomplete="off" :model="formData" ref="formRef">
      <a-row>
        <a-col v-bind="colStyle" v-for="(item, index) in formItems" :key="index">
          <a-form-item
            :label="item.label"
            :name="item.name"
            :rules="item.rules"
            :labelCol="formLabelCol"
          >
            <template v-if="item.type === 'input'">
              <a-input size="small" v-bind="item.options" v-model:value="formData[item.filed]" />
            </template>
            <template v-if="item.type === 'select'">
              <a-select size="small" v-bind="item.options" v-model:value="formData[item.filed]" />
            </template>
            <template v-if="item.type === 'radio'">
              <a-radio-group
                size="small"
                v-bind="item.options"
                v-model:value="formData[item.filed]"
              />
            </template>
            <template v-if="item.type === 'datePicker'">
              <a-range-picker
                size="small"
                v-bind="item.options"
                v-model:value="formData[item.filed]"
              />
            </template>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="form-btns">
      <template v-if="showSubmitBtn">
        <a-button size="small" type="primary" style="margin-right: 10px" @click="submit">{{
          submitBtnText || $t("form.submit")
        }}</a-button>
      </template>
      <template v-if="showResetBtn">
        <a-button size="small" type="primary" ghost @click="reset">{{ $t("form.reset") }}</a-button>
      </template>
      <slot name="formBtn"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fixed {
  position: sticky;
  top: 0;
  z-index: 9;
}
.custom-form {
  padding: 20px;
  border-radius: 10px;
  background-color: var(--background-color);
  box-shadow: var(--box-shadow);
  :deep(.ant-form-item) {
    margin-bottom: 20px;
  }
  .form-btns {
    display: flex;
    justify-content: flex-end;
  }
}
@media (max-width: 768px) {
  :deep(.ant-form-item) {
    margin-bottom: 10px !important;
  }
  :deep(.ant-form-item-label) {
    padding-bottom: 0 !important;
  }
}
</style>
