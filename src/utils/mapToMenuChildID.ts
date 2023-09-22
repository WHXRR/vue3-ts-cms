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

export { mapToMenuChildID }
