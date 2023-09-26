import { computed } from 'vue';
import i18n from '@/locals';
import type { IFormItems } from '@/components/customForm/types';

const { t } = i18n.global;

const formItems = computed<IFormItems[]>(() => [
  {
    filed: "title",
    type: "input",
    name: "title",
    label: t("story.title"),
    rules: [{ required: true, message: t("story.inputTitle") }],
    options: {
      placeholder: t("story.inputTitle")
    }
  },
])
export {
  formItems,
}
