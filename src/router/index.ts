import { createRouter, createWebHistory } from "vue-router"
import useCache from "@/utils/cache"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/LoginBox.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("@/views/main/Main.vue"),
      children: []
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import("@/views/not-found/404.vue")
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = useCache.getItem("cmsToken")
  if (to.path !== "/login") {
    if (!token) {
      next("/login")
    } else {
      next()
    }
  } else {
    if (token) {
      next("/")
    } else {
      next()
    }
  }
})

export default router
