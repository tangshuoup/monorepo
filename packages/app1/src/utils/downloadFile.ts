import { stringify } from 'qs';
import sha256 from 'crypto-js/sha256';
import { host } from './config';
import { existy } from './utils';

/**
 * 格式化普通请求url
 * @param {*} url
 * @param {*} option
 * url上参数&拼接，body参数转json字符串
 * sign：sha256加密的值
 * {sign, sid, stamp} shaUrl上的参数
 * eg. 加密参数例如: /appPlatform/api/appPlatform/hospitalDepartment/list?sid=26000000124393627&signKey=43cda7c350b24c3980d15982f4e77851&stamp=1610685891917&{"pageNum":1,"pageSize":10}
 * 注：匹配完整url第一个'/'及后面的字符串 url.match(/^(https?:\/\/[^\/]*)(.*)/)?.[2]
 */
export const formatGatewayUrl = (url, option: any = {}) => {
  const { sid, signKey } = JSON.parse(localStorage.getItem('userInfo')) || {};
  const { data: body = {}, params, downloadParams } = option;

  //处理url上的参数
  const paramData = {
    ...params,
    sid,
    stamp: new Date().getTime(),
  };
  const reqParams = {
    ...downloadParams,
    ...params,
    ...paramData,
    signKey,
  };
  let sortReqParams = {};
  Object.keys(reqParams).sort().forEach(item => {
    //undefined null ''不通过，0 false通过
    const temp = typeof reqParams[item] === 'string' ? reqParams[item].trim() : reqParams[item];
    if (existy(temp) && temp !== '') {
      sortReqParams[item] = temp;
    }
  });

  //处理body里面的参数
  let sortBodyParams = {};
  Object.keys(body).sort().forEach(item => {
    sortBodyParams[item] = body[item];
  });

  //body为{}时的处理
  const bodyToJson = Object.keys(body).length > 0 ? `&${JSON.stringify(sortBodyParams)}` : '';

  const shaParams = `${url}?${stringify(sortReqParams, { encode: false })}${bodyToJson}`;
  const hashDigest = sha256(shaParams).toString();
  const shaUrl = `${url}?${stringify({ sign: hashDigest, ...paramData })}`;
  console.log('加密字符串：', shaParams);
  return shaUrl;
};

/**
 * 格式化文件上传下载url
 * @param url
 * @param params
 */
export const download = (url, downloadParams = {}) => {
  let iframe = document.querySelector('#downloadFrame') as HTMLIFrameElement;
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.id = 'downloadFrame';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }
  // ie11 中文乱码
  iframe.src = encodeURI(`${formatGatewayUrl(url, { downloadParams })}`);
};

/**
 * 格式化websocket
 * @param url
 */
export const formatWebsocketUrl = (url) => {
  const { sid } = JSON.parse(localStorage.getItem('userInfo')) || {};
  return `${url}?sid=${sid}`;
};

