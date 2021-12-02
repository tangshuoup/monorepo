module.exports = {
  plugins: ['react', 'react-hooks'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    // 定义过的变量必须使用
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
      },
    ],
  },
  root: true,
  extends: ['eslint-config-firesoon/typescript-react'],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
};
