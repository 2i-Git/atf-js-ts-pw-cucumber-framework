/** @type {import('prettier').Config} */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "es5",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  embeddedLanguageFormatting: "auto",
  experimentalTernaries: true,

  overrides: [
    {
      files: ["*.md"],
      options: {
        proseWrap: "always",
      },
    },
    {
      files: ["*.json", "*.yml", "*.yaml"],
      options: {
        printWidth: 80,
      },
    },
  ],
};

export default config;
