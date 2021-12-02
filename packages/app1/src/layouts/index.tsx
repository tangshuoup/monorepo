import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import NoNetwork from '@/pages/errorPage';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import Nav from './Header';
import CustomBreadcrumb from './Breadcrumb';
import Sider from './Sider';
import styles from './layout.less';
import { Inspector } from 'react-dev-inspector';

const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const { Content } = Layout;

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
        <Layout className={styles.bodySection}>
          <Nav />

          {['/errorPage'].includes(pathname) ? (
            props.children
          ) : !navigator.onLine ? (
            <NoNetwork type="no-network" />
          ) : (
            <Layout className={styles.main}>
              <Sider />
              <Layout className={styles.contentLayout}>
                <CustomBreadcrumb />
                <Content className={styles.contentSection}>{props.children}</Content>
              </Layout>
            </Layout>
          )}
        </Layout>
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
