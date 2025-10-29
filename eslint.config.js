// @ts-check

import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    ignores: ["node_modules/", "playwright-report/", "test-results/"],
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
