/**
 * @param: current
 * @param: all
 */
export function mapPathToMenu(current: string, all: any[]) {
  // 优先查找一级菜单
  const directMatch = all.find((item) => item.url === current);
  if (directMatch) return directMatch;
  // 深度查找子菜单
  for (const menu of all) {
    if (!menu.children) continue;
    const found = menu.children.find((child) => child.url === current);
    if (found) return found;
  }
  return null; // 未找到返回null
}

/**
 * @description:
 * @return {*}
 */
export function mapPathToBreadCrumb(current: string, all: any[]) {
  // 深度查找子菜单
  const breadCrumb = [];
  for (const menu of all) {
    if (!menu.children) continue;
    const found = menu.children.find((child) => child.url === current);
    if (found) {
      breadCrumb.push({
        name: menu.name,
      });
      breadCrumb.push({
        name: found.name,
        path: found.url,
      });
      return breadCrumb;
    }
  }
  return null; // 未找到返回null
}
