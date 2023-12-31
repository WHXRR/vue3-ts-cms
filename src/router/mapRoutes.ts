import type { RouteRecordRaw } from "vue-router";

let firstMenu = ''
export default async function (userMenu: any[]): Promise<RouteRecordRaw[]> {
  const routes: RouteRecordRaw[] = []

  // 拿到所有写好的路由
  let allRoutes: RouteRecordRaw[] = []

  // 将后端返回的菜单与所有路由进行匹配
  allRoutes = await getAllRoutes()

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        if (!firstMenu) {
          firstMenu = menu.url
        }
        const route = allRoutes.find(route => route.meta?.url === menu.url)
        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenu)

  return routes
}
async function getAllRoutes(): Promise<RouteRecordRaw[]> {
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles:Record<string, any> = import.meta.glob('./main/*/*.ts', { eager: true })
  for (const path in routeFiles) {
    const route = routeFiles[path].default
    allRoutes.push(route)
  }

  return allRoutes
}

export {
  firstMenu
}
