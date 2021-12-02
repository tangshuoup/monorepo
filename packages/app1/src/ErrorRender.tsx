/*
菜单接口请求失败返回的界面
 */

import ReactDom from 'react-dom';
import { Result } from 'antd';

export default ({ msg }) => {
  return ReactDom.render(
    <Result status="500" title="500" subTitle={msg || '服务器出了一些问题'} />,
    document.getElementById('root'),
  );
};
