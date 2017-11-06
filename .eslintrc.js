module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jasmine: true,
    jquery: true
  },
  extends: ["airbnb", "prettier", "prettier/react"],
  globals: {
    getJSONFixture: true,
    inject: false,
    jest: true,
    loadJSONFixtures: true,
    module: false,
    test: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["prettier", "react"],
  rules: {
    "no-dupe-keys": "error",
    "no-nested-ternary": "off",
    "no-plusplus": "off",
    "no-return-assign": ["error", "except-parens"],
    strict: "error",
    "require-jsdoc": "off",
    "prettier/prettier": "error",
    "react/jsx-wrap-multilines": "off",
    "react/prop-types": "off"
  }
};
