<script setup lang="ts">
import Icon, { TableOutlined, RedoOutlined } from "@ant-design/icons-vue"
import { ref, watch, computed } from "vue"
import draggable from "vuedraggable"
import type { PropType } from "vue"

const props = defineProps({
  columns: { type: Array as PropType<any[]>, required: true },
  tableColumns: { type: Array, required: true },
  initTableColumns: { type: Array, default: () => [] }
})
const emit = defineEmits(["update:tableColumns", "update:initTableColumns"])

const dropdownVisible = ref(false)

const checkboxList = ref<any[]>([])
watch(
  () => props.columns,
  () => {
    if (props.initTableColumns.length) {
      checkboxList.value = JSON.parse(JSON.stringify(props.initTableColumns))
    } else {
      checkboxList.value = JSON.parse(JSON.stringify(props.columns)).map((item: any) => ({
        ...item,
        checked: true
      }))
    }
  },
  {
    immediate: true
  }
)
watch(
  () => checkboxList.value,
  (newValue) => {
    const tableColumns = newValue.filter((item) => item.checked)
    emit("update:tableColumns", tableColumns)
    emit("update:initTableColumns", newValue)
  },
  {
    immediate: true,
    deep: true
  }
)
const columnsDisplayedNum = computed(() => checkboxList.value.filter((item) => item.checked).length)
const resetTable = () => {
  checkboxList.value = JSON.parse(JSON.stringify(props.columns)).map((item: any) => ({
    ...item,
    checked: true
  }))
}
const dragging = ref(false)
</script>
<template>
  <a-dropdown trigger="click" v-model:open="dropdownVisible">
    <a class="ant-dropdown-link" @click.prevent>
      <a-button type="primary" size="small">
        <TableOutlined />
      </a-button>
    </a>
    <template #overlay>
      <a-menu class="table-column-menu">
        <draggable
          :list="checkboxList"
          item-key="dataIndex"
          @start="dragging = true"
          @end="dragging = false"
        >
          <template #item="{ element }">
            <div>
              <a-menu-item>
                <a-checkbox
                  v-model:checked="element.checked"
                  :disabled="element.checked && columnsDisplayedNum === 1"
                  >{{ element.title }}</a-checkbox
                >
                <icon :style="{ fontSize: '15px', paddingLeft: '5px' }">
                  <template #component>
                    <svg
                      t="1694502244408"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="3997"
                      width="1em"
                      height="1em"
                    >
                      <path
                        d="M263.744 377.344a32 32 0 0 1 3.712 40.832l-3.712 4.48-90.496 90.496 90.88 90.88a32 32 0 0 1 3.648 40.768l-3.648 4.48a32 32 0 0 1-40.832 3.648l-4.48-3.712-113.472-113.472a32 32 0 0 1-3.648-40.832l3.648-4.416 113.152-113.152a32 32 0 0 1 45.248 0zM761.792 649.216a32 32 0 0 1-3.712-40.832l3.712-4.416 90.496-90.496-90.88-90.88a32 32 0 0 1-3.648-40.768l3.712-4.48a32 32 0 0 1 40.768-3.648l4.48 3.648 113.472 113.472a32 32 0 0 1 3.648 40.832l-3.648 4.48-113.152 113.088a32 32 0 0 1-45.248 0z"
                        fill="#999999"
                        p-id="3998"
                      ></path>
                      <path
                        d="M192 544a32 32 0 0 1-5.76-63.488L192 480h640a32 32 0 0 1 5.76 63.488L832 544H192z"
                        fill="#999999"
                        p-id="3999"
                      ></path>
                      <path
                        d="M647.936 262.72a32 32 0 0 1-40.832 3.648l-4.48-3.648L512.256 172.16l-90.88 90.88a32 32 0 0 1-40.832 3.712l-4.416-3.712a32 32 0 0 1-3.712-40.832l3.712-4.48L489.6 104.32a32 32 0 0 1 40.832-3.712l4.48 3.712 113.088 113.152a32 32 0 0 1 0 45.248zM376.064 760.704a32 32 0 0 1 40.832-3.712l4.48 3.712L511.744 851.2l90.88-90.88a32 32 0 0 1 40.832-3.648l4.416 3.712a32 32 0 0 1 3.712 40.832l-3.712 4.416L534.4 919.04a32 32 0 0 1-40.832 3.712l-4.48-3.712-113.088-113.152a32 32 0 0 1 0-45.248z"
                        fill="#999999"
                        p-id="4000"
                      ></path>
                      <path
                        d="M481.28 190.912a32 32 0 0 1 63.488-5.76l0.512 5.76v640a32 32 0 0 1-63.488 5.76l-0.512-5.76v-640z"
                        fill="#999999"
                        p-id="4001"
                      ></path>
                    </svg>
                  </template>
                </icon>
              </a-menu-item>
            </div>
          </template>
        </draggable>
        <div style="text-align: center">
          <a-button type="text" size="small" @click="resetTable">
            <RedoOutlined />
          </a-button>
        </div>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<style lang="scss" scoped></style>
