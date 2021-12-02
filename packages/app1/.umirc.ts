/*
 * @Descripttion: 
 * @version: 
 * @Author: tangshuo
 * @Date: 2021-11-30 14:55:46
 * @LastEditors: tangshuo
 * @LastEditTime: 2021-12-02 17:22:05
 */
import { prefix, version } from './src/utils/config';
// const { ModuleFederationPlugin } = require("webpack").container;
// const deps = require("./package.json").dependencies;
import theme from './src/utils/theme';
const path = require('path');

export default {
  targets: {
    ie: 10,
  },
  dva: {},
  antd: {},
  qiankun: {
    master: {
    }
  },
  dynamicImport: {
    // loading: 'subApp/Loading',
  },
  alias: {
    '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.ts'),
    '@shuotest/components': path.resolve(__dirname, '../components/')
  },
  // webpack5: {},
  chainWebpack(config) {
    config.merge({
      optimization: {
        splitChunks: {
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.(css|less)$/,
              chunks: 'async',
              minChunks: 2,
              minSize: 0,
            },
            vendors: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
              chunks: 'all',
              minSize: 30000,
              minChunks: 3,
              automaticNameDelimiter: '.',
            },
          },
        },
      },
    });
    // config.plugin('mf').use(ModuleFederationPlugin, [{
    //   name: 'mainApp',
    //   remotes: {
    //     subApp: "subApp@http://localhost:3001/remoteEntry.js"
    //   },
    //   shared: { 
    //     react: { 
    //       requiredVersion: deps.react,
    //       singleton: true,
    //       eager: true
    //     }, 
    //     "react-dom": { 
    //       requiredVersion: deps['react-dom'],
    //       singleton: true,
    //       eager: true
    //      } 
    //     },
    // }]);
  },
  ignoreMomentLocale: true,
  metas: [{ 'http-equiv': 'A-UA-Compatible', content: 'IE=Edge,chrome=1' }],
  title: 'mainApp',
  base: `/${prefix}`,
  publicPath: `/${prefix}/`,
  favicon: `/${prefix}/favicon.ico`,
  outputPath: `/dist-${version}/`,
  extraBabelPlugins: ['lodash'],
  plugins: ['lodash-webpack-plugin'],
  theme,
};
