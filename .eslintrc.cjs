module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/no-explicit-any": ["warn"],
    "max-lines": ["warn", { max: 80, skipBlankLines: true, skipComments: true }],
  },
};
