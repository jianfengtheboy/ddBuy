module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    /**
     *  "off" 或 0 - 关闭规则
     *  "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
     *  "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁用不必要的转义字符
    'no-useless-escape': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止出现未使用过的变量
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 不允许在 case 子句中使用词法声明
    'no-case-declarations': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
