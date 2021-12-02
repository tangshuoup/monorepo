import { useCallback, useEffect, useMemo, useState } from 'react';
import { Sider } from '@firesoon/ant-ui';
import { useDispatch, useSelector } from 'dva';
import { deepEqualForCommon, routerPush } from '@/utils/utils';
import { authMenu } from '@/utils/menu';

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const breadcrumbMenus = useSelector(({ breadcrumb }: any) => breadcrumb.breadcrumbMenus, deepEqualForCommon);

  const selectedKeys = useMemo(() => {
    return breadcrumbMenus.length === 1 // 只有首页
      ? [breadcrumbMenus[0].id]
      : breadcrumbMenus.slice(1).map((v) => v.id);
  }, [breadcrumbMenus]);

  const [openKeys, setOpenKeys] = useState([selectedKeys[0]]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!openKeys.includes(selectedKeys[0])) {
      setOpenKeys([...openKeys, selectedKeys[0]]);
    }
    // 只需要首页链接到其他菜单项时，才需要更新展开的菜单项
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKeys]);

  const onSubMenu = useCallback(({ key }) => {
    setOpenKeys((prevOpenKeys) => deleteSameAddDiff(prevOpenKeys, key));
  }, []);

  // 清除上一系列页面的state
  const onSelect = () => {
    // 使用setTimeout变为宏任务 降低执行优先级 避免页面跳转前就clear state
    setTimeout(() => {
      selectedKeys.forEach((key) => {
        dispatch({
          type: `${key}/clear`,
        });
      });
    });
  };

  const linkTo = ({ key }) => {
    routerPush(key);
  };

  return (
    <Sider
      collapsed={collapsed}
      onCollapse={setCollapsed}
      openKeys={openKeys}
      onSubMenu={onSubMenu}
      onSelect={onSelect}
      menuTree={authMenu.tree}
      selectedKeys={selectedKeys}
      handleClick={linkTo}
    />
  );
};

function deleteSameAddDiff(arr, value) {
  const idx = arr.findIndex((v) => v === value);
  if (idx > -1) {
    const nextArr = arr.slice();
    nextArr.splice(idx, 1);
    return nextArr;
  }
  return arr.concat([value]);
}
