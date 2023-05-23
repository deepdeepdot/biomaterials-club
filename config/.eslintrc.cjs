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
    "comma-dangle": 0,
    "dot-notation": 0,
    "implicit-arrow-linebreak": 0,
    "import/extensions": [ "error", { "js": "ignorePackages", "mjs": "ignorePackages" } ],
    "no-param-reassign": 0,
    "no-unused-vars": 1,
    "object-curly-newline": 0,
    "operator-linebreak": 0,
    "prefer-const": 0,
    "prefer-destructuring": 1
  },
};
