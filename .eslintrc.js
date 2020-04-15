module.exports = {
  root: true,
  env: {
    "browser": true, // グローバルオブジェクト「window」とかが書けるようになる。
    "commonjs": true, // 「reauire」とかが書けるようになる。
    "es6": true // ES6の構文が書けるようになる。
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019
  },
  extends: [
    'eslint:recommended'
  ],
  rules: {
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}