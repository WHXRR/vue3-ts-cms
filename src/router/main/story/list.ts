export default {
  name: 'list',
  path: '/main/story/list',
  meta: {
    url: '/main/story/list',
  },
  component: () => import("@/views/main/story/List.vue")
}
