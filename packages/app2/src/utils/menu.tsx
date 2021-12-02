import { Jiesuanzonghetongji, JiesuanzonghetongjiFill } from '@firesoon/icons-react';
import { Menu } from '@firesoon/ant-ui/es/components/Sider/interface';

export type IMenu = Menu;
export const iconMap = {
  home: [Jiesuanzonghetongji, JiesuanzonghetongjiFill],
  drgAnalysis: [Jiesuanzonghetongji, JiesuanzonghetongjiFill],
  medicare: [Jiesuanzonghetongji, JiesuanzonghetongjiFill],
  setting: [Jiesuanzonghetongji, JiesuanzonghetongjiFill],
};

const menu: Array<Menu> = [
  {
    route: '/home',
    id: 'home',
    title: '首页',
    icons: iconMap.home,
  },
  {
    route: '/home/detail',
    id: 'homeDetail',
    title: '详情',
    isHide: true, // 不显示导航菜单
  },
]

export const originFlatMenu = treeToArray(menu);

export interface IAuthMenu {
  searchTree: Menu[] | [];
  tree: Menu[] | [];
}
// 用来保存权限菜单和用来搜索的flat菜单
export const authMenu: IAuthMenu = {
  searchTree: [],
  set tree(list) {
    this.innerTree = list;
    this.searchTree = treeToArray(list);
  },
  get tree() {
    return this.innerTree || [];
  },
};

function treeToArray(tree) {
  const arr: Array<any> = [];
  const loop = (data) => {
    data.forEach((k: any) => {
      if (k.children?.length) {
        arr.push(k);
        loop(k.children);
      } else {
        arr.push(k);
      }
    });
  };
  loop(tree);
  return arr;
}

export default menu;
