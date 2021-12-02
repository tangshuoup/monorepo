-------

This project was bootstrapped with [firesoon-cli](http://172.16.3.30:9527/firesoon-fe/Hogwarts/firesoon-cli).

## 路由跳转

- 面包屑上的点击和添加

```javascript
// Breadcrumb.tsx

// 点击 根据idx截取 保留剩下的路由
 dispatch({
    type: 'breadcrumb/to',
    payload: {
      targetMenu: menu, // utils/menu.tsx IMenu类型
      idx,
    } 
});

// 添加(将直接添加到当前面包屑后)
dispatch({
  type: 'breadcrumb/to',
  payload: {
    id: 'menuId',
    query: { ... },
  }
})
```

- 面包屑整体变更

在models/global.ts里对路由变化做了判断`patchUrl`, `findPreviousMenu(pathname)`根据路由关系重新生成`breadcrumbMenus`

`utils/utils.ts routePush`
```javascript
// 例子 pages/home/Home.tsx
const linkToDept = (type) => {
  routerPush('dept', {
    query: {
      activeType: type,
     }
  });
};
```

## Restful

默认post请求，可根据实际情况修改

以下展示model中使用

services
```js
// 如果是默认的post
export function postData(data) {
  return request('/info', {
    prefix: user,
    data,
  });
}

// get请求
export function getInfo(id) {
  return request.get('/info', {
    prefix: user,
  });

  // get某一个 /info/infoID
  // return request.get(`/info/${id}`, {
  // prefix: user,
  // });
}
```

## TODO

- [ ] 封装对`/user/:id`的支持

## FAQs

##### src/components会被引用它的页面重复打包css内容, 通过配置`.umirc.ts/splitChunks`打包成一个css文件解决该问题。如果css打包后过大，可参考[extract-css-chunks-webpack-plugin](https://github.com/faceyspacey/extract-css-chunks-webpack-plugin) 
 [extract css](https://github.com/shirleyMHao/blog/issues/5) 进行分包或者删掉chainWebpack的配置

##### breadcrumb为什么还要存到sessionStorage里？

会有直接添加到面包屑后的子项（产品设计的混乱跳转）, 路由可能不符合findPreviousMenu查找规范, 存到storage里避免刷新后面包屑出现错误。

##### 初始化的项目目前使用的是无锡费率法的菜单接口

初始化的项目里注释了权限菜单获取的相关代码，可根据需求使用

- 删除`app.ts`

```diff
- authMenu.init = menu;
- oldRender();
```
`postMenuRole`方法取消注释。

- 取消`patchRoutes`方法注释

```js
export const authMenu = {
  tree: [], // --> 修改为静态的menu
  searchTree: [], // --> 使用treeToArray转化静态的menu
  ...
}
```

##### 在`utils/constant.ts`中修改首页的id，默认'home'

##### 使用<Icon type='xxx' /> 不显示？

为减小打包体积，对antd icons采用了按需引入的社区解决方案，对于使用的`<Icon type='xxx' />`需要在src/icons里手动导入

##### 免密登录不成功？

`app.ts`有对路由的请求，如果有免密登录的需求，对该需要改造
