function mapToMenuChildID(menu: any) {
  const result: any[] = []
  function _mapChild(child: any) {
    for (const subMenu of child) {
      if (subMenu.children) {
        _mapChild(subMenu.children)
      } else {
        result.push(subMenu.id)
      }
    }
  }
  _mapChild(menu)
  return result
}

function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    menus.forEach(menu => {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    })
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export { mapToMenuChildID, mapMenusToPermissions }
