// 异常页集合
import { Button } from 'antd';
import { history } from 'umi';
import { NoPermissions, Html404, ServerError, NoNetwork } from '@firesoon/icons-react';
import styles from '../global.less';

export default ({ type }: { type?: string }) => {
  const errorType: any = type || history.location.query.type; // 异常类型

  /** 返回应用中心 */
  const platform = () => {
    const element: HTMLElement = document.getElementsByClassName('fs-back')[0] as HTMLElement;
    element.click();
  };

  /** 不同errorType对应图标 */
  const Icons = {
    '404': <Html404 />,
    private: <NoPermissions />,
    error: <ServerError style={{ marginBottom: 24 }} />,
    'no-network': <NoNetwork style={{ marginBottom: 24 }} />,
  }[errorType];

  /** 不同errorType对应文案 */
  const text = {
    '404': '抱歉，您访问的页面不见了，请刷新试试',
    private: '抱歉，您没有访问权限，请联系管理员',
    error: '抱歉，页面出错了，请稍后重试',
    'no-network': '抱歉，您的网络出现了问题，刷新试试',
  }[errorType];

  return (
    <div className={styles.statusPage}>
      {Icons}
      <div className={styles.tip}>{text}</div>
      <Button onClick={() => platform()} type="primary">
        返回应用中心
      </Button>
    </div>
  );
};
