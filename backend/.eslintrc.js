module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: "standard-with-typescript",
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }]
  }
};
