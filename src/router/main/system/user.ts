export default {
  name: 'user',
  path: '/main/system/user',
  meta: {
    url: '/main/system/user',
  },
  component: () => import("@/views/main/system/User.vue")
}
