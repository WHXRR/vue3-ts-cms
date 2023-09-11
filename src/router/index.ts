import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
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
  // 初始化header的路由tabs和侧边菜单选中
  const systemStore = useSystemStore()
  const userInfoStore = useUserInfoStore()
  const currentRoute = getRoute(userInfoStore.userMenus, to.path)
  if (currentRoute) {
    systemStore.openKeys = [currentRoute.parentId]
    systemStore.selectedKeys = [currentRoute.id]
  }
  if (currentRoute) {
    systemStore.currentTabs = currentRoute.url
    const isSameRoute = systemStore.systemHistoryRoutes.find(item => item.url === currentRoute.url)
    if (!isSameRoute) {
      systemStore.systemHistoryRoutes.push({
        name: currentRoute.name,
        url: currentRoute.url,
        query: to.query
      })
    } else {
      if (Object.keys(to.query).length) {
        isSameRoute.query = to.query
      }
    }
  }

  if (to.path !== "/login") {
    if (!token) {
      next({name: 'login'})
    } else {
      if (to.path === '/main') {
        next(firstMenu)
      } else {
        next()
      }
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
