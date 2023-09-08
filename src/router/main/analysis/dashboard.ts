export default {
  name: 'dashboard',
  path: '/main/analysis/dashboard',
  meta: {
    url: '/main/analysis/dashboard',
  },
  component: () => import("@/views/main/analysis/Dashboard.vue")
}
