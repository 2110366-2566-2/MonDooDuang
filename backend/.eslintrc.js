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
  ignorePatterns: ["dist", ".eslintrc.js"],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
    indent: ["error", 2],
    semi: ["error", "never"],
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/quotes": ["error", "double"]
  }
}
