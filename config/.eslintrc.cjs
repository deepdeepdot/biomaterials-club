module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "prefer-const": 0,
    "prefer-destructuring": 1,
    "no-param-reassign": 1,
    "no-unused-vars": 1
  },
};
