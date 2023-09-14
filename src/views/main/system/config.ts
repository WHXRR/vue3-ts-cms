import { computed } from 'vue';
import type { IFormItems } from '@/components/customForm/types';
import i18n from '@/locals';
const { t } = i18n.global;

const userListColumns = computed(() => [
  {
    title: "#",
    width: 40,
    dataIndex: "index",
    align: "center"
  },
  {
    title: t("form.name"),
    dataIndex: "name",
    align: "center"
  },
  {
    title: t("form.realname"),
    dataIndex: "realname",
    align: "center"
  },
  {
    title: t("form.cellphone"),
    dataIndex: "cellphone",
    align: "center"
  },
  {
    title: t("form.enable"),
    dataIndex: "enable",
    align: "center"
  },
  {
    title: t("form.createAt"),
    dataIndex: "createAt",
    align: "center"
  },
  {
    title: t("form.updateAt"),
    dataIndex: "updateAt",
    align: "center"
  }
]
)

const userListSearchFormItems = computed<IFormItems[]>(() => [
  {
    filed: "name",
    type: "input",
    name: "name",
    label: t("form.name"),
    options: {
      placeholder: t("form.inputName")
    }
  },
  {
    filed: "realname",
    type: "input",
    name: "realname",
    label: t("form.realname"),
    options: {
      placeholder: t("form.inputRealname")
    }
  },
  {
    filed: "cellphone",
    type: "input",
    name: "cellphone",
    label: t("form.cellphone"),
    options: {
      placeholder: t("form.inputCellphone")
    }
  },
  {
    filed: "enable",
    type: "select",
    name: "enable",
    label: t("form.enable"),
    options: {
      placeholder: t("form.inputSelectEnable"),
      options: [
        {
          value: 1,
          label: t("form.start")
        },
        {
          value: 0,
          label: t("form.disable")
        }
      ]
    }
  },
  {
    filed: "createAt",
    type: "datePicker",
    name: "createAt",
    label: t("form.createAt"),
  }
])
export {
  userListColumns,
  userListSearchFormItems
}
