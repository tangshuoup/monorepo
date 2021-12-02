/*
处理面包屑 路由跳转
 */

import { history } from 'umi';

import { findPreviousMenu, cloneDeepForCommon, stringify, isUndefined } from '@/utils/utils';
import { authMenu, IMenu } from '@/utils/menu';

type PathMenu = IMenu & {
  query?: object;
  search?: string;
};
interface IPath {
  id?: string;
  query?: object;
  search?: string;
  targetMenu?: PathMenu;
  idx?: number;
}

interface PathPayload {
  payload: IPath;
}

const namespace = 'breadcrumb';

export default {
  namespace,
  state: {
    breadcrumbMenus: JSON.parse(sessionStorage.getItem('breadcrumbMenus')) || [],
    activeKey: sessionStorage.getItem('activeKey'),
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'patchUrl',
          payload: {
            ...location,
          },
        });
      });
    },
  },
  effects: {
    *patchUrl({ payload }, { put, select }) {
      const { pathname, search } = payload;
      let { breadcrumbMenus } = yield select((_) => _[namespace]);
      if (breadcrumbMenus[breadcrumbMenus.length - 1]?.route !== pathname) {
        // 当前地址栏的url和存储在sessionStorage里不相符（手动输入url访问和菜单点击）
        const bMenu = findPreviousMenu(pathname);

        bMenu[bMenu.length - 1].search = search;

        yield put({
          type: 'updateRoute',
          payload: {
            breadcrumbMenus: bMenu,
            activeKey: bMenu[bMenu.length - 1].id,
          },
        });
      }
    },

    /**
     * 路由跳转
     * 只适用于：1.面包屑上的跳转
     *     2.页面内有多父级的 不需要根据route生成面包屑路由的页面(直接添加到breadcrumbMenu后面)
     * @param payload { id?: string; targetMenu?: IMenu, idx?: number, query?: object, search?: string }
     * @param put
     * @param select
     * @param call
     * 面包屑跳转使用targetMenu和 idx(点击的路由在breadcrumbMenus的索引)
     * 页面内的路由变化使用id和query等其他参数
     */
    *to({ payload }: PathPayload, { put, select, call }) {
      const { idx } = payload;
      const { breadcrumbMenus, activeKey: lastActiveKey } = yield select((_) => _[namespace]);
      const { list, needClear } = getNextPathInfo(payload, lastActiveKey, breadcrumbMenus);

      const activeMenu = list[list.length - 1];
      yield put({
        type: 'updateRoute',
        payload: {
          breadcrumbMenus: list,
          activeKey: activeMenu.id,
        },
      });

      // 统一使用search query只是api提供的最终也是转化为search
      yield call(history.push, {
        pathname: activeMenu.route,
        search: activeMenu.search,
      });

      // 关闭的页面状态清空
      if (needClear) {
        for (let i = idx + 1; i < breadcrumbMenus.length; i++) {
          yield put({
            type: `${breadcrumbMenus[i].id}/clear`,
          });
        }
      }
    },
    *updateRoute({ payload }, { put }) {
      const { breadcrumbMenus, activeKey } = payload;
      // 持久化处理，刷新不丢失
      sessionStorage.setItem('breadcrumbMenus', JSON.stringify(breadcrumbMenus));
      sessionStorage.setItem('activeKey', activeKey);

      yield put({
        type: 'updateState',
        payload,
      });
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

function getNextPathInfo(payload, lastActiveKey, current) {
  const nextPathList = cloneDeepForCommon(current);
  const { targetMenu, id, idx, query } = payload;
  let { search } = payload;
  let needClear = false;

  if (typeof id === 'string') {
    // 页面的点击跳转 或者query变化
    search = search || stringify(query, false);
    if (lastActiveKey === id) {
      // id相同 说明是query变化 query保存到storage
      const lastIdx = nextPathList.length - 1;
      search && (nextPathList[lastIdx].search = search);
    } else {
      // 页面内的点击跳转
      const nextMenu = cloneDeepForCommon(authMenu.searchTree.find((v) => v.id === id));
      search && (nextMenu.search = search);

      nextPathList.push(nextMenu);
    }
  } else if (typeof targetMenu === 'object') {
    if (isUndefined(idx)) {
      throw new Error(`missing 'idx' in the effects -- breadcrumb/to`);
    }

    // 关闭的页面状态清空
    needClear = true;

    nextPathList.length = idx + 1;
  }

  return {
    list: nextPathList,
    needClear,
  };
}
