import { createRouter, createWebHistory } from "vue-router"
import { firstMenu } from "./mapRoutes"
import { useSystemStore } from "@/stores/system"
import { useUserInfoStore } from "@/stores/user"
import useCache from "@/utils/cache"
import getRoute from "@/utils/getRoute"

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
  // 初始化header的路由tabs
  const systemStore = useSystemStore()
  const userInfoStore = useUserInfoStore()
  const currentRoute = getRoute(userInfoStore.userMenus, to.path)
  if (currentRoute) {
    systemStore.currentTabs = currentRoute.url
    const isSameRoute = systemStore.systemHistoryRoutes.find(item => item.url === currentRoute.url)
    if (!isSameRoute) {
      systemStore.systemHistoryRoutes.push({
        name: currentRoute.name,
        url: currentRoute.url
      })
    }
  }

  if (to.path !== "/login") {
    if (to.path === '/main') {
      next(firstMenu)
    }
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
