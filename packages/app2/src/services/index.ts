import request from '@/utils/request';
import { appPlatform } from '@/utils/config';

export function postUserInfo() {
  return request.post(`user/toUserInfo`, {
    prefix: appPlatform,
  });
}

// 菜单
export function postMenu() {
  return request.post(`user/toUserRoleMenuList`, {
    prefix: appPlatform,
  });
}

// 角色
export function postRole() {
  return request.post(`user/toUserRoleList`, {
    prefix: appPlatform,
  });
}

// 修改角色
export function postChangeRole(params) {
  return request.post(`user/userChangeRole`, {
    data: params,
    prefix: appPlatform,
  });
}

// 退出登录
export function logout() {
  return request.post(`security/user/logout`, {
    prefix: appPlatform,
  });
}

// 修改密码
export function postPassword(params) {
  return request.post(`sysUser/modifyPassword`, {
    data: params,
    prefix: appPlatform,
  });
}


export function sendLogs(param) {
  return request('pub/v2/addSysOperateLog', {
    prefix: appPlatform,
    encrypted: false,
    data: param,
  });
}

