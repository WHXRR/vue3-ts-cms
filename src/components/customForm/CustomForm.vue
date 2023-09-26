<script setup lang="ts">
import { watch, ref, onMounted } from "vue"
import { useSystemStore } from "@/stores/system"
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue"
import type { IFormItems, IColStyle } from "./types"
import type { PropType } from "vue"

const systemStore = useSystemStore()
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formName: {
    type: String,
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
  },
  showCollapsed: {
    type: Boolean,
    default: true
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
  formRef.value.validate().then(() => {
    emit("submit")
  })
}
const reset = () => {
  formRef.value.resetFields()
  emit("reset")
}

// 表单的收起与展开
const isCollapsed = ref(false)
const handleCollapsed = () => {
  const colHeight = document.querySelector(".form-col .ant-form-item")?.clientHeight
  const formContainer = document.querySelector(".form-container") as HTMLElement
  const formHeight = document.querySelector(".form")?.clientHeight
  const btnsHeight = document.querySelector(".form-btns")?.clientHeight || 0
  if (isCollapsed.value && colHeight && formHeight) {
    isCollapsed.value = false
    formContainer.style.height = formHeight + btnsHeight + "px"
  } else {
    isCollapsed.value = true
    formContainer.style.height = colHeight + "px"
  }
}
onMounted(() => {
  if (props.showCollapsed) {
    handleCollapsed()
  }
})

defineExpose({
  submit,
  reset
})
</script>
<template>
  <div class="custom-form">
    <div class="form-container">
      <a-form class="form" :name="formName" autocomplete="off" :model="formData" ref="formRef">
        <a-row>
          <a-col class="form-col" v-bind="colStyle" v-for="(item, index) in formItems" :key="index">
            <a-form-item
              :label="item.label"
              :name="item.name"
              :rules="item.rules"
              :labelCol="formLabelCol"
              v-if="!item.hidden"
            >
              <template v-if="item.type === 'input'">
                <a-input size="small" v-bind="item.options" v-model:value="formData[item.filed]" />
              </template>
              <template v-if="item.type === 'password'">
                <a-input-password
                  size="small"
                  v-bind="item.options"
                  v-model:value="formData[item.filed]"
                />
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
          <a-button size="small" type="primary" @click="submit">{{
            submitBtnText || $t("form.submit")
          }}</a-button>
        </template>
        <template v-if="showResetBtn">
          <a-button size="small" type="primary" style="margin-left: 10px" ghost @click="reset">{{
            $t("form.reset")
          }}</a-button>
        </template>
        <slot name="formBtn"></slot>
      </div>
    </div>
    <div style="text-align: right; padding-top: 5px" v-if="showCollapsed">
      <a-button
        size="small"
        type="link"
        :style="{ color: systemStore.systemThemeColor.color }"
        v-show="isCollapsed"
        @click="handleCollapsed"
      >
        {{ $t("form.expand") }}
        <DownOutlined />
      </a-button>
      <a-button
        size="small"
        type="link"
        :style="{ color: systemStore.systemThemeColor.color }"
        v-show="!isCollapsed"
        @click="handleCollapsed"
      >
        {{ $t("form.collapse") }}
        <UpOutlined />
      </a-button>
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
  .form-container {
    overflow: hidden;
    max-height: 800px;
    transition: height 0.3s ease-in-out;
  }
  :deep(.ant-form-item) {
    margin-bottom: 10px;
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
