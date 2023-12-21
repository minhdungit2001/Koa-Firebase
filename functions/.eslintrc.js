module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    "ecmaVersion": 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
    "prettier"
  ],
  rules: {
    "spaced-comment": "off",
    "valid-jsdoc": "off",
    "linebreak-style": "off",
    "object-curly-spacing": "off",
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    "quotes": "off",
    'babel/no-unused-expressions': 'off'
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
