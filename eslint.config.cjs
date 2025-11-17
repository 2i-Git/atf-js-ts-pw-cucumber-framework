const eslint = require("@eslint/js");
const globals = require("globals");
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    ignores: [
      "node_modules/",
      "playwright-report/",
      "eslint.config.cjs", // ignore self
      "allure-report",
      "allure-results",
    ],
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: { ...globals.node },
    },
    rules: {
      "@/no-restricted-exports": ["error", { restrictDefaultExports: { direct: true } }],
      "@typescript-eslint/no-floating-promises": ["error"],
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-base-to-string": ["warn", { ignoredTypeNames: ["Locator", "Date"] }],
    },
  }
);
