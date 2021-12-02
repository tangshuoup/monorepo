import { extend, RequestOptionsInit, RequestMethod } from 'umi-request';
import { message } from 'antd';
import { host, torch } from './config';
import { formatGatewayUrl } from '@/utils/downloadFile';

interface IOpt extends RequestOptionsInit {
  // 是否走网关, 默认true
  encrypted?: boolean;
}

interface IRequestMethod extends RequestMethod {
  (url: string, options: IOpt): Promise<any>;
}

const request: IRequestMethod = extend({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  credentials: 'include',
  method: 'GET',
  prefix: torch,
});

request.interceptors.request.use((pathname, options: IOpt) => {
  const { data = {}, encrypted = true, ...rest } = options;

  let href = host + pathname;
  if (encrypted) {
    href = formatGatewayUrl(pathname, options);
  }

  return {
    url: href,
    options: { interceptors: true, ...rest, data },
  };
});

request.interceptors.response.use(async (response, { responseType = 'json' }) => {
  if (responseType === 'json') {
    const data = await response.clone().json();
    if (data.httpCode === 401) {
      sessionStorage.clear();
      location.href = data.data;
      throw data;
    } else if (data.httpCode !== 200) {
      message.error(data.msg);
    }
  } else if (responseType === 'text') {
    await response.clone().text();
  }
  return response;
});

export default request;
