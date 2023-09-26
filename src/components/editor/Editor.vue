<script setup lang="ts">
import { onBeforeUnmount, ref, shallowRef, watch } from "vue"
import { Editor, Toolbar } from "@wangeditor/editor-for-vue"

import "@wangeditor/editor/dist/css/style.css"

defineProps<{
  toolbarConfig?: any
  editorConfig?: any
  mode?: "default" | "simple"
  modelValue: string
  editorStyle?: any
}>()
const emits = defineEmits(["update:modelValue"])

const editorRef = shallowRef()
const valueHtml = ref("")

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor
}

watch(valueHtml, (newValue) => {
  emits("update:modelValue", newValue)
})
</script>
<template>
  <div class="editor-container">
    <Toolbar class="toolbar" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor
      :style="editorStyle"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      @onCreated="handleCreated"
    />
  </div>
</template>
<style lang="scss" scoped>
.editor-container {
  border-radius: 10px;
  overflow: hidden;
  .toolbar {
    border-bottom: 1px solid var(--tabs-border-bottom-color);
  }
}
</style>
