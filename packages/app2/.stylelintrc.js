module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
  ],
  // 可以加入自定义规则，合理即可
  rules: {
    'no-descending-specificity': null,
    'length-zero-no-unit': null,
    'number-leading-zero': null
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
};
