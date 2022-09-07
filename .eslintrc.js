module.exports = {
  env: {
    browser: false,
    es2021: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist/*.js', 'jest.config.js'],
  extends: ["eslint:recommended", "prettier"],
  overrides: [{
    files: ['src/**/*.js'],
  }],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
  },
};
