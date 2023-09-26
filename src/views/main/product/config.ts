import { computed } from 'vue';
import type { IFormItems } from '@/components/customForm/types';
import i18n from '@/locals';
const { t } = i18n.global;

const goodsListColumns = computed(() => [
  {
    title: "#",
    width: 40,
    dataIndex: "index",
    align: "center"
  },
  {
    title: t("product.imgUrl"),
    dataIndex: "imgUrl",
    width: 120,
    align: "center"
  },
  {
    title: t("product.name"),
    dataIndex: "name",
    align: "center",
    ellipsis: true
  },
  {
    title: t("product.address"),
    dataIndex: "address",
    align: "center",
    ellipsis: true
  },
  {
    title: t("product.oldPrice"),
    dataIndex: "oldPrice",
    width: 90,
    align: "center"
  },
  {
    title: t("product.newPrice"),
    dataIndex: "newPrice",
    width: 90,
    align: "center"
  },
  {
    title: t("product.enable"),
    dataIndex: "status",
    width: 100,
    align: "center"
  },
  {
    title: t("product.createAt"),
    dataIndex: "createAt",
    align: "center"
  },
  {
    title: t("product.updateAt"),
    dataIndex: "updateAt",
    align: "center"
  }
]
)

const categoryListColumns = computed(() => [
  {
    title: "#",
    width: 40,
    dataIndex: "index",
    align: "center"
  },
  {
    title: t("product.name"),
    dataIndex: "name",
    align: "center",
    ellipsis: true
  },
  {
    title: t("product.createAt"),
    dataIndex: "createAt",
    align: "center"
  },
  {
    title: t("product.updateAt"),
    dataIndex: "updateAt",
    align: "center"
  }
]
)

const categoryListSearchFormItems = computed<IFormItems[]>(() => [
  {
    filed: "name",
    type: "input",
    name: "name",
    label: t("form.name"),
    options: {
      placeholder: t("form.inputName")
    }
  }
])
export {
  goodsListColumns,
  categoryListColumns,
  categoryListSearchFormItems
}
