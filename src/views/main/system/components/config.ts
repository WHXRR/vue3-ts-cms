import { computed } from 'vue';
import type { IFormItems } from '@/components/customForm/types';
import i18n from '@/locals';
const { t } = i18n.global;

const userFormItems = computed<IFormItems[]>(() => [
  {
    filed: "name",
    type: "input",
    label: t("form.name"),
    rules: [{ required: true, message: t("form.inputName") }],
    options: {
      placeholder: t("form.inputName")
    }
  },
  {
    filed: "realname",
    type: "input",
    label: t("form.realname"),
    rules: [{ required: true, message: t("form.inputRealname") }],
    options: {
      placeholder: t("form.inputRealname")
    }
  },
  {
    filed: "cellphone",
    type: "input",
    label: t("form.cellphone"),
    rules: [{ required: true, message: t("form.inputCellphone") }],
    options: {
      placeholder: t("form.inputCellphone")
    }
  },
  {
    filed: "password",
    type: "password",
    label: t("form.password"),
    rules: [{ required: true, message: t("form.inputPassword") }],
    options: {
      placeholder: t("form.inputPassword")
    }
  },
])
export {
  userFormItems
}
