import { history } from 'umi';
import { cloneDeep, sum } from 'lodash';
import { authMenu } from './menu';
import { HOME_ID } from './constant';
export const col192 = ['deptName', 'teamName', 'drgName', 'doctorName'];
const HOME_PATH = '/' + HOME_ID;

export function hasHome() {
  return authMenu.tree[0]?.id === HOME_ID;
}
/**
 * 跟据pathname查找父级目录
 * @param pathname
 * @return Array<any>
 */
export function findPreviousMenu(pathname: string): Array<any> {
  const { searchTree } = authMenu;
  let previousMenu = [];

  // 考虑没有配置首页
  if (hasHome()) {
    previousMenu = [{ ...searchTree[0], clickable: true }];
  }

  // 拆分路径
  const dirs = pathname.split('/');
  let idx = 0;
  let parentPath = '';

  while (++idx < dirs.length) {
    parentPath += `/${dirs[idx]}`;
    // eslint-disable-next-line no-loop-func
    const parentMenu = searchTree.find((v) => v.route === parentPath);
    if (!parentMenu || parentPath === HOME_PATH) {
      continue;
    }
    // Array.find()结果是浅复制
    const deepParentMenu = cloneDeep(parentMenu);
    // 父级菜单是否能点击
    // 本身是可点击的一级菜单； 包含二级菜单但展示为一级
    const clickable = (!parentMenu.isHideChild && !parentMenu.children) || (parentMenu.children && parentMenu.isHideChild);

    delete deepParentMenu.children;
    delete deepParentMenu.icon;
    deepParentMenu.clickable = clickable;

    previousMenu.push(deepParentMenu);
  }
  return previousMenu;
}

// 效率最高的深拷贝
// 适用于没有Date, function, undefined, Infinity, RegExps, Map, Set, Blob, 循环引用的数据
export function cloneDeepForCommon(origin) {
  return JSON.parse(JSON.stringify(origin));
}

export function deepEqualForCommon(prev, next) {
  return JSON.stringify(prev) === JSON.stringify(next);
}

/**
 * 将object 转为 key1=value1&key2=value2
 * @param obj 要转化的object
 * @param allToUndefined {boolean} 是否将all 全部转化为undefined
 * @return {string}
 */
export function stringify(obj?: object, allToUndefined = true) {
  if (isUndefined(obj)) {
    return;
  }
  const keys = Object.keys(obj);
  let result = [];
  keys.forEach((v) => {
    let value = obj[v];
    if (allToUndefined) {
      value = transformAllToUndefined(value);
    }
    if (!isUndefined(value)) {
      result.push(`${v}=${obj[v]}`);
    }
  });
  return result.join('&');
}

export function isUndefined(target) {
  return typeof target === 'undefined';
}

// 全部转化为undefined 或其他字符
export function transformAllToUndefined(str, to?: any) {
  if (str !== '全部' && str !== 'all') {
    return str;
  } else if (to) {
    return to;
  }
}

/**
 * history.push id版
 * @param id
 * @param params { query?: object, search?: string }
 */
export function routerPush(id, params = {}) {
  const menu = authMenu.searchTree.find((v) => v.id === id);
  if (!menu) {
    throw new Error(`expected an existing id in the flatMenu`);
  }

  history.push({
    pathname: menu.route,
    ...params,
  });
}

export function existy(val) {
  return val != null;
}
export const getScrollX = (cols) => {
  const widths = cols.filter((item) => !item.isHide).map((item) => item.width);
  return sum([...widths, 40]);
};
export function mergeColumns(dynamicColumn) {
  const columns = [];
  dynamicColumn.forEach((dc) => {
    const item = { ...dc };
    //列宽
    item.width =
      item.width ||
      Math.max(
        item.width ?? 80,
        item.title?.length * 12 +
          24 +
          (Number(item.sorter) || Number(item.filters?.length > 0)) * 28 +
          (item.tips ?? 16),
      );

    if (col192.includes(item.dataIndex)) {
      item.width = 192;
    }

    columns.push(item);
  });
  return columns;
}
