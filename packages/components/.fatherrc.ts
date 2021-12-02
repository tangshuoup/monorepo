/*
 * @Descripttion: 
 * @version: 
 * @Author: tangshuo
 * @Date: 2021-12-02 17:59:31
 * @LastEditors: tangshuo
 * @LastEditTime: 2021-12-02 18:09:01
 */
export default {
  target: 'browser',
  esm: 'babel',
  cjs: 'babel',
  umd: {
    name: 'ant-ui',
    sourcemap: true,
  },
  lessInBabelMode: true, // babel 模式下做 less 编译
  runtimeHelpers: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: '@firesoon/antd-ui',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
