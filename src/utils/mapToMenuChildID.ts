const result: any[] = []
function mapToMenuChildID(menu: any) {
  for (const subMenu of menu) {
    if (subMenu.children) {
      mapToMenuChildID(subMenu.children)
    } else {
      result.push(subMenu.id)
    }
  }
  return result
}

export { mapToMenuChildID }
