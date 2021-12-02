/*
 * @Descripttion: 
 * @version: 
 * @Author: tangshuo
 * @Date: 2021-11-30 15:51:41
 * @LastEditors: tangshuo
 * @LastEditTime: 2021-12-01 18:00:20
 */
import { prefix, version } from './src/utils/config';
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
import theme from './src/utils/theme';
const path = require('path');

export default {
  targets: {
    ie: 10,
  },
  dva: {},
  antd: {},
  qiankun: {
    slave: {}
  },
  webpack5: {},
  dynamicImport: {
    loading: '@/components/Loading/index.tsx',
  },
  alias: {
    '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.ts'),
  },
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
    config.plugin('mf').use(ModuleFederationPlugin, [{
      name: 'subApp',
      library: { type: 'umd', name: 'subApp' },
      filename: 'remoteEntry.js',
      exposes: {
        './Loading':'./src/components/Loading/index.tsx'
      },
      shared: {  
        react: { 
          requiredVersion: deps.react,
          singleton: true,
          eager: true
        }, 
        "react-dom": { 
          requiredVersion: deps['react-dom'],
          singleton: true,
          eager: true
        } 
      },
    }]);
    config.output.publicPath('auto');
  },
  ignoreMomentLocale: true,
  metas: [{ 'http-equiv': 'A-UA-Compatible', content: 'IE=Edge,chrome=1' }],
  title: '医保结算管理系统',
  base: `/${prefix}`,
  // publicPath: `/${prefix}/`,
  favicon: `/${prefix}/favicon.ico`,
  outputPath: `/dist-${version}/`,
  extraBabelPlugins: ['lodash'],
  plugins: ['lodash-webpack-plugin'],
  theme,
};
