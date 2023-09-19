import { computed } from 'vue';
import i18n from '@/locals';
import { useUserInfoStore } from "@/stores/user"
import type { IFormItems } from '@/components/customForm/types';

const userInfoStore = useUserInfoStore()
const { t } = i18n.global;

const userFormItems = computed<IFormItems[]>(() => [
  {
    filed: "name",
    type: "input",
    name: "name",
    label: t("form.name"),
    rules: [{ required: true, message: t("form.inputName") }],
    options: {
      placeholder: t("form.inputName")
    }
  },
  {
    filed: "realname",
    type: "input",
    name: "realname",
    label: t("form.realname"),
    rules: [{ required: true, message: t("form.inputRealname") }],
    options: {
      placeholder: t("form.inputRealname")
    }
  },
  {
    filed: "cellphone",
    type: "input",
    name: "cellphone",
    label: t("form.cellphone"),
    rules: [{ required: true, message: t("form.inputCellphone") }],
    options: {
      placeholder: t("form.inputCellphone")
    }
  },
  {
    filed: "password",
    type: "password",
    name: "password",
    label: t("form.password"),
    rules: [{ required: true, message: t("form.inputPassword") }],
    options: {
      placeholder: t("form.inputPassword")
    }
  },
  {
    filed: "departmentId",
    type: "select",
    name: "departmentId",
    label: t("form.department"),
    rules: [{ required: true, message: t("form.selectDepartment") }],
    options: {
      placeholder: t("form.selectDepartment"),
      options: userInfoStore.departmentList
    }
  },
  {
    filed: "roleId",
    type: "select",
    name: "roleId",
    label: t("form.role"),
    rules: [{ required: true, message: t("form.selectRole") }],
    options: {
      placeholder: t("form.selectRole"),
      options: userInfoStore.roleList
    }
  },
])
export {
  userFormItems
}
