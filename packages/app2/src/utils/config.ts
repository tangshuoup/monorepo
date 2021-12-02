/*
 * @Descripttion: 
 * @version: 
 * @Author: tangshuo
 * @Date: 2021-11-30 15:51:41
 * @LastEditors: tangshuo
 * @LastEditTime: 2021-11-30 16:33:23
 */
// 项目版本号
export const version = '1.0.0.0';

// 项目前缀
export const prefix = 'subApp';

let HOST = '';

if (process.env.NODE_ENV === 'development') {
  // HOST = 'http://172.16.3.40';
  // HOST = 'http://172.16.9.69:5100';
}

export const host = HOST;

export const drg = '/drg/api/drg/';
export const turkey = '/torch/api/turkey/';
export const torch = '/torch/api/torch/';
export const appPlatform = '/torch/api/appPlatform/';
