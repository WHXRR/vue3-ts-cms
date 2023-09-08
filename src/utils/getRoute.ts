
const getRoute = (menus: any[], currentPath: string): any => {
  for (const item of menus) {
    if (item.type !== 2 && item.children.length) {
      const route = getRoute(item.children, currentPath);
      if (route) {
        return route; // 返回匹配项
      }
    } else {
      if (item.url === currentPath) {
        return item
      }
    }
  }
}

export default getRoute
