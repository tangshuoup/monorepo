import { history } from 'umi';
import { postMenu } from '@/services';
import menu, { originFlatMenu, authMenu, iconMap, IMenu } from '@/utils/menu';

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
    },
  },
};

// 手动添加hideMenu 的路由
const haveAccessedRoutes = ['/errorPage'];

// 剔除没有配置的路由
// export function patchRoutes({ routes }) {
//   const routeList = routes[0].routes;
//   routes[0].routes = routeList.filter(v => haveAccessedRoutes.includes(v.path));
// }

export function render(oldRender) {
  // 保存sid和signKey
  if (history.location.query.sid) {
    localStorage.setItem('userInfo', JSON.stringify(history.location.query || {}));
  }

  // 使用本地导航
  authMenu.tree = menu;
  oldRender();
  if (history.location.pathname === '/') {
    history.push(authMenu.tree[0].route);
  }
  // postMenu()
  //   .then((res) => {
  //     if (
  //       (res && res.httpCode === 403) ||
  //       (res && res.httpCode === 300 && res.msg === '数据权限没有初始化，请联系管理员')
  //     ) {
  //       history.push('/errorPage?type=private');
  //       return;
  //     }

  //     authMenu.tree = getAuthMenu(res.data);
  //     // 路由切换到第一个可点击的菜单
  //     if (haveAccessedRoutes.indexOf(history.location.pathname) === -1) {
  //       const pathname =
  //         findFirstMenuRoute(authMenu.tree) || (!res.data?.length ? '/errorPage?type=private' : '/errorPage?type=404');
  //       history.push(pathname);
  //     }
  //   })
  //   .catch((_e) => {
  //     history.push('/errorPage?type=error');
  //   })
  //   .finally(() => {
  //     oldRender();
  //   });
}

// 与menu进行差异化比较 保存hideMenu hideChild的 最终全局只使用authMenu
function getAuthMenu(list) {
  function byServerMenu(curMenu, menus: IMenu[] = []) {
    curMenu.forEach((v) => {
      const { authorityMenuCode } = v;
      // 一定是菜单项包含的
      const localMenuItem = originFlatMenu.find((itm) => itm.id === authorityMenuCode);

      // 不是SubMenu的title路由
      if (!v.children) {
        haveAccessedRoutes.push(v.url);
      }

      let item;
      // 不会出现在配置项的菜单（不会出现在菜单项 仅在内部跳转）
      if (localMenuItem.isHideChild && localMenuItem.children) {
        item = localMenuItem;
        localMenuItem.children.forEach((lim) => {
          haveAccessedRoutes.push(lim.route);
        });
      } else {
        item = {
          id: authorityMenuCode,
          title: v.authorityMenuName,
          route: v.url,
          icons: iconMap[authorityMenuCode],
          children: v.children && byServerMenu(v.children),
        };
      }
      menus.push(item);
    });
    return menus;
  }
  const menus = byServerMenu(list);
  // 保证所有的hideMenu放最后 （生成面包屑时是否有首页的判断可直接取第一个）
  return menus.concat(originFlatMenu.filter((v) => v.isHide));
}

function findFirstMenuRoute(m) {
  const item = m.find((v) => !v.isHide);
  return item.isHideChild || !item.children ? item.route : item.children[0].route;
}


export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('app1 bootstrap', props);
  },
  // 应用 render 之前触发
  async mount(props) {
    console.log('app1 mount', props);
    if (props) {
      process.env['QIAN_KUN'] = 'qiankun'
      console.log(process.env)

    }
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('app1 unmount', props);
  },
};