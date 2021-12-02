import { Button } from 'antd';
import { Html404 } from '@firesoon/icons-react';
import styles from '../global.less';

export default () => {
  const platform = () => {
    const element: HTMLElement = document.getElementsByClassName('fs-back')[0] as HTMLElement;
    element.click();
  };

  return (
    <div className={styles.statusPage}>
      <Html404 />
      <div className={styles.tip}>抱歉，您访问的页面不见了，请刷新试试</div>
      <Button onClick={() => platform()} type="primary">
        返回应用中心
      </Button>
    </div>
  );
};
