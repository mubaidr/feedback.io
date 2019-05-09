module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'airbnb', 'prettier'],
  rules: {
    'func-names': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};
