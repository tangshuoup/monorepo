/*
 * @Descripttion: 
 * @version: 
 * @Author: tangshuo
 * @Date: 2021-11-30 15:51:41
 * @LastEditors: tangshuo
 * @LastEditTime: 2021-12-01 15:20:16
 */
import React from 'react';
import { ConfigProvider } from 'antd';
import NoNetwork from '@/pages/errorPage';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import styles from './layout.less';
import { Inspector } from 'react-dev-inspector';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;


const BasicLayout: React.FC = (props: any) => {
  const pathname: any = props?.location?.pathname;

  return (
    <ConfigProvider
      locale={zhCN}
      getPopupContainer={(trigger) => {
        if (trigger) {
          return trigger.parentElement;
        }
        return document.body;
      }}
    >
      <div className={styles.body}>

          {['/errorPage'].includes(pathname) ? (
            props.children
          ) : !navigator.onLine ? (
            <NoNetwork type="no-network" />
          ) : (
           
            <div>{props.children}</div>
          )}
      </div>
    </ConfigProvider>
  );
};

const InspectorLayout = (props) => {
  return (
    <InspectorWrapper keys={['control', 'alt', 'space']} disableLaunchEditor={false}>
      <BasicLayout {...props} />
    </InspectorWrapper>
  );
};

export default InspectorLayout;
