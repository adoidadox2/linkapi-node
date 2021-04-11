module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "no-new": "off",
    "dot-notation": "off",
    "consistent-return": "off",
    "no-else-return": "off",
    "no-lonely-if": "off",
    "no-restricted-syntax": "off",
    "no-plusplus": "off",
    radix: "off",
    "prettier/prettier": "error",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    camelcase: "off",
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    "import/first": "off",
    "import/prefer-default-export": "off",
    "import/no-cycle": "off",
  },
};