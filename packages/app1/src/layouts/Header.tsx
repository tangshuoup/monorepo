import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Header } from '@firesoon/ant-ui';
import logo from '@/assets/logo.png';
import { deepEqualForCommon } from '@/utils/utils';

export default () => {
  const dispatch = useDispatch();
  const { userInfo, roleList, loading } = useSelector(
    ({ user, loading }: any) => ({
      userInfo: user.userInfo,
      roleList: user.roleList,
      loading: loading.effects['user/changePassword'],
    }),
    deepEqualForCommon,
  );

  const [visible, setVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function logout() {
    dispatch({
      type: 'user/logout',
    });
  }

  function onChangeRole(value) {
    dispatch({
      type: 'user/changeRole',
      payload: {
        id: value,
      },
    });
  }

  const onBackToAppCenter = () => {
    if (userInfo.appCenterVisitUrl) {
      window.location.href = `${userInfo.appCenterVisitUrl}/appPlatform/web/choiceApp?id=${userInfo.choiceHospitalId}`;
      sessionStorage.clear();
    }
  };

  useEffect(() => {
    !visible && setErrorMsg('');
  }, [visible]);

  const savePassword = (params) => {
    dispatch({
      type: 'user/changePassword',
      payload: params,
      callback: (type, res) => {
        if (type) {
          setErrorMsg('');
          setVisible(false);
        } else {
          setErrorMsg(res.msg);
        }
      },
    });
  };

  return (
    <Header
      onChangeRole={onChangeRole}
      roleKey={userInfo?.roleId}
      roles={roleList}
      logo={logo}
      userInfo={userInfo}
      hosName={userInfo?.choiceHospitalName}
      isMoreHosptial={userInfo?.userHospitalCount > 1}
      version={userInfo?.version}
      onLogout={logout}
      onBackTo={onBackToAppCenter}
      pswOptions={{
        visible,
        setVisible,
        errorMsg,
        loading,
        onSavePsw: savePassword,
      }}
    />
  );
};
