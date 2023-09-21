
import { notification } from 'ant-design-vue';
import { NotificationOutlined } from '@ant-design/icons-vue';
import { useSystemStore } from "@/stores/system"
import { h } from 'vue';
import i18n from '@/locals';

const { t } = i18n.global;
const openNotification = (description: string, title: string = t('notification.title')) => {
  const systemStore = useSystemStore()
  notification.open({
    message: title,
    description,
    duration: 2,
    icon: () => h(NotificationOutlined, { style: 'color: ' + systemStore.systemThemeColor.color }),
  });
};
export default openNotification
