<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { formItems } from "./config"
import { CustomForm, Editor } from "@/components"
import api from "@/service/api"
import "@wangeditor/editor/dist/css/style.css"
import type { IForm, IFormItems } from "@/components/customForm/types"

const { t } = useI18n()
const editorConfig = { placeholder: t("story.input") }

const valueHtml = ref("")
const open = ref(false)
const formRef = ref()
const formConfig = ref<IForm>({
  formItems: formItems as unknown as IFormItems[],
  formName: "story",
  colStyle: {
    sm: 24
  },
  formLabelCol: { span: 4 },
  showCollapsed: false,
  showResetBtn: false
})
const formData = ref({
  title: ""
})
const submit = () => {
  const params = {
    title: formData.value.title,
    content: valueHtml.value
  }
  api.addStory(params).then(() => {
    formRef.value.reset()
    open.value = false
  })
}
</script>
<template>
  <div class="box-module-shadow editor-container">
    <Editor
      v-model="valueHtml"
      :editorConfig="editorConfig"
      editorStyle="height: calc(100vh - 300px); overflow-y: hidden"
    />
  </div>
  <div class="btn">
    <a-button type="primary" @click="open = true">{{ $t("story.add") }}</a-button>
  </div>
  <a-modal v-model:open="open" :title="$t('story.add')">
    <CustomForm v-bind="formConfig" v-model="formData" @submit="submit" ref="formRef" />
    <template #footer></template>
  </a-modal>
</template>
<style lang="scss" scoped>
.editor-container {
  border-radius: 10px;
  overflow: hidden;
  .toolbar {
    border-bottom: 1px solid var(--tabs-border-bottom-color);
  }
}
.btn {
  text-align: right;
  margin-top: 20px;
}
</style>
