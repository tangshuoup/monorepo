/*
 * @Descripttion: 
 * @version: 
 * @Author: tangshuo
 * @Date: 2021-12-02 17:59:31
 * @LastEditors: tangshuo
 * @LastEditTime: 2021-12-02 18:19:17
 */
export default {
  esm: 'rollup',
  cjs: 'rollup',
  runtimeHelpers: true,
  cssModules: { generateScopedName: '[local]___[hash:base64:5]' },
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
