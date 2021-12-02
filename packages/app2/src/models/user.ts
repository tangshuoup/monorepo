import { cloneDeep } from 'lodash';
import { message } from 'antd';
import * as api from '@/services';

const initialState = {
  roleList: [],
};

const namespace = 'user';

export default {
  namespace,
  state: cloneDeep(initialState),
  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'queryUserInfo',
      });
    },
  },
  effects: {
    *logout(_, { call }) {
      const data = yield call(api.logout, {});
      if (data && data.httpCode === 200) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = data.data;
      }
    },
    *changeRole({ payload }, { call }) {
      const res = yield call(api.postChangeRole, payload);
      if (res.httpCode === 200) {
        window.location.reload();
      }
    },
    *queryUserInfo(_, { call, put, all }) {
      const res = yield all([call(api.postRole), call(api.postUserInfo)]);
      if (res[1].httpCode === 200) {
        const d = res[1].data;
        yield put({
          type: 'updateState',
          payload: {
            userInfo: d,
          },
        });
      }
      if (res[0].httpCode === 200) {
        yield put({
          type: 'updateState',
          payload: {
            roleList: res[0].data.sysRoleVoList.map((v) => ({
              name: v.roleName,
              value: v.id,
            })),
          },
        });
      }
    },
    *changePassword({ payload, callback }, { call, select }) {
      const { userId } = yield select((_) => _[namespace].userInfo);
      const params = {
        id: userId,
        ...payload,
      };
      const data = yield call(api.postPassword, params);
      if (data.httpCode === 200) {
        message.success('修改成功');
        callback(true);
      } else {
        callback(false, data);
      }
    },
  },
  reducers: {
    updateState: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    clear: () => cloneDeep(initialState),
  },
};
