# TypeScript Playwright base configuration project

A template for new repositories using TypeScript Playwright, originally created by nFocus SDETs, now
maintained by 2i Testing.

## Contents

- TypeScript Playwright base configuration project
  - [Contents](#Contents)
  - [Using this Repo Template](#using-this-repo-template)
    - [Using GitHub](#using-github)
    - [Using alternative Git repository](#using-alternative-git-repository)
  - [Install into existing project](#install-into-existing-project)
    - [npm modules](#npm-modules)
    - [Files](#files)
  - [VSCode extensions](#vscode-extensions)
  - [Files](#files-1)
    - [`eslint.config.js`](#eslintconfigjs)
      - [Rules Documentation](#rules-documentation)
    - [`.prettier.config.js`](#prettierconfigjs)
      - [Rules Documentation](#rules-documentation-1)
    - [`playwright.config.ts`](#playwrightconfigts)
      - [Documentation](#documentation)
    - [`tsconfig.json`](#tsconfigjson)
      - [Documentation](#documentation-1)
      - [`baseUrl`](#baseurl)
      - [`paths` (Path Alias)](#paths-path-alias)
  - [Folder Structure](#folder-structure)
    - [`components`](#components)
    - [`enums`](#enums)
    - [`fixtures`](#fixtures)
    - [`helpers`](#helpers)
    - [`models`](#models)
    - [`pages`](#pages)
  - [Style Guide](#style-guide)
    - [Identifiers](#identifiers)
    - [Filenames](#filenames)
    - [Code Style](#code-style)
      - [Write Simple Code](#write-simple-code)
      - [Guard Clauses](#guard-clauses)
  - [Code Snippets](#code-snippets)
  - [Release Notes](#release-notes)
    - [Version 0.1](#version-01)
    - [Version 0.2](#version-02)
    - [Version 0.3](#version-03)

<div style="text-align: right"><a href="#contents">Top ⬆️</a></div>

## Using this Repo Template

### Pre-requisites

Before you begin, ensure you have the following installed on your system:

- Node.js (version X.Y.Z or later)
- npm (comes bundled with Node.js)

You can check if Node.js and npm are installed by running:

```
node -v
npm -v
```

If you don’t see version numbers or get an error,
[download and install Node.js](https://nodejs.org/).

### Using GitHub

1. Clone repo to local machine [(see GitHub Desktop)](https://github.com/apps/desktop)
2. Open repo in VSCode
3. Add all [VS Code Extensions](#VSCode-Extensions)
4. Run `npm install`
5. Run `npx playwright install`
6. Finally, we can now run `npx playwright test` to start testing, this should pass and prove that
    everything is setup correctly


### npm modules

Run the following command to install the required npm modules:

```bash
npm install -D @playwright/test @types/node @eslint/js@8.57.0 eslint@8.57.0 typescript@5.4.5 typescript-eslint dotenv globals
```

Typescript-ESLint currently requires specific npm package versions:

- eslint - 8.57.0
- @eslint/js - 8.57.0
- typescript - 5.4.5

### Files

Download the following files and **_merge_** them into the project.

- [`eslint.config.js`](#eslintconfigjs)
- [`.prettier.config.js`](#prettierconfig)
- [`playwright.config.js`](#playwrightconfig)
- [`tsconfig.json`](#tsconfig)

Inside the package.json file add:

```json
  "type": "module",
```

to the root of the JSON object.

You will need to restart VSCode for all the changes to be made to the editor.

<div style="text-align: right"><a href="#contents">Top ⬆️</a></div>

## VSCode Extensions

These extensions are required to allow VSCode to interact with the npm modules installed.

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - Typescript-ESLint requires the pre-release version (>v3.0.7) of this extension
- [Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
  - Recommend turning off the 'Show browser' option in the Playwright panel in the 'Testing' tab
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - You will need to set Prettier as the default `*.ts` formatter. This can be done by going to the
    VSCode settings UI and searching for `@id:editor.defaultFormatter @lang:typescript`.
  - To initiate formatting you can use `shift` + `alt` + `F`.
  - Alternatively search for `editor.formatOnSave` inside the Settings UI and check the box and it
    will then format the file whenever you press Save or `ctrl` + `S`

<div style="text-align: right"><a href="#contents">Top ⬆️</a></div>

## Files

- [`eslint.config.js`](#eslintconfigjs) - ESLint config
- [`.prettier.config.js`](#prettierconfig) - Prettier config
- [`playwright.config.js`](#playwrightconfig) - Playwright config
- [`tsconfig.json`](#tsconfig) - Typescript config

## Commands

- `npx playwright test` - Runs Playwright’s test runner to execute your browser-based end-to-end
  tests and report results.
- `npm run lint` - Runs the linter (e.g., ESLint) to check your code for style issues and potential
  errors based on your linting rules.
- `npm run format:check` - Runs Prettier in check mode to verify that your files are formatted
  correctly without modifying them. Fails if formatting issues are found.
- `npm run format:write` - Runs Prettier in write mode to automatically format your files in place
  according to your Prettier configuration.

---

### `eslint.config.js`

Uses the `typescript-eslint` package to allow `ESLint` to lint Typescript files.

#### [Rules Documentation](https://typescript-eslint.io/rules)

Use the link above to find new rules.\
Use `.prettier.config.js` for stylistic rules.\
The following rules have been implemented.

- `"@typescript-eslint/no-floating-promises": ["error"]`
- `"@typescript-eslint/restrict-template-expressions": "off"`
- `"@typescript-eslint/no-base-to-string": ["warn", { ignoredTypeNames: ["Locator", "Date"] }]`
- `"@/no-restricted-exports": ["error", { "restrictDefaultExports": { "direct": true } }]`,

---

### `.prettier.config.js`

Used by the Prettier VSCode plugin to have consistant styling across all js/ts files.

#### [Rules Documentation](https://prettier.io/docs/en/options)

---

### `playwright.config.ts`

#### [Documentation](https://playwright.dev/docs/test-configuration)

---

### `tsconfig.json`

#### [Documentation](https://www.typescriptlang.org/tsconfig)

#### `baseUrl`

Sets the base directory to resolve non-relative module names.\
Defaults to `"."` (root folder).\
**!!! DO NOT CHANGE UNLESS YOU KNOW WHAT YOU ARE DOING, THIS IS NOT THE BASEURL FOR THE WEBSITE YOU
ARE TESTING !!!**

#### `paths` (Path Alias)

This allows you to simplify your imports in a `.ts` file, so instead of

```js
import Homepage from "../../pages/Homepage";
```

you can write

```js
import Homepage from "@pages/Homepage";
```

<div style="text-align: right"><a href="#contents">Top ⬆️</a></div>

## Folder Structure

More information can be found in the `docs` folder in the
[`project-structure.md`](./docs/project-structure.md) file.

### `components`

**Somewhere to store Component Object Models (COMs)**

By default, this folder contains a `BaseComponent` POM.

### `enums`

**Somewhere to store Enumerated objects (enums)**

### `fixtures`

**Somewhere to store fixtures**

By default this comes with three files: `combined.ts`, `data.ts`, and `pages.ts`.

`pages.ts` imports `test` from `data.ts` to allow you to use test data inside your page fixtures.

`combined.ts` is the file to import into your `*.spec.ts` files as this is the end point of all the
fixtures. It uses the `mergeTest` and `mergeExpect` functions from Playwright so you can have
multiple branches, i.e. an admin branch and a user branch each with their own data.

An example import into a spec file would be:

```ts
import { test, expect } from "@fixtures/combined";
```

### `helpers`

**Somewhere to store extra files such as helper functions**

### `models`

**Somewhere to store data models, interfaces, types**

### `pages`

**Somewhere to store Page Object Models (POMs)**

By default, this folder contains a `BasePage` POM.

## Style Guide

It is recommended to read and follow the TypeScript style guide which can be found
[here](https://ts.dev/style) but a brief summary can be found below.

### Identifiers

| Style                         | Identifier                                     |
| ----------------------------- | ---------------------------------------------- |
| `UpperCamelCase` (PascalCase) | class/interface/type/enum/decorator/parameters |
| `lowerCamelCase` (DeCapped)   | variable/parameter/function/method/property    |
| `CONSTANT_CASE`               | enum values                                    |

### Filenames

Filenames should be given in `kebab-case` (e.g. `messaging-thread-list-item.ts`) to give as much
compatability as possible.

### Code Style

#### Write Simple Code

Try to not write long fuctions/methods by breaking them down into shorter functions and composing
them together.

#### Guard Clauses

Write safer and easier to read code by using
[Guard Clauses](https://www.youtube.com/watch?v=EumXak7TyQ0). This reduces the need for an `else`
clause and makes your code easier to read and maintain.

<div style="text-align: right"><a href="#contents">Top ⬆️</a></div>

## Code Snippets

There are several VSCode Code Snippets added to the project.

- Scaffolding snippets
  - `nfpw-com` - Scaffolds a new Component Object Model file.
  - `nfpw-pom` - Scaffolds a new Page Object Model file.

To use:

1. Create a new file in the folder
2. Save with the name of the class you want to use
3. Open the file
4. Start typing the code snippet
5. Press 'Enter' to use

Once run, the curser will have selected the class name for easy editing. Pressing 'TAB' will move to
the bottom of the class to start adding locators and methods

- Property/Method helper snippets
  - `nfpw-cpub` - Create a public property in a COM
  - `nfpw-cpri` - Create a private property in a COM
  - `nfpw-ppub` - Create a public property in a POM
  - `nfpw-ppri` - Create a private property in a POM
  - `nfpw-pub-met` - Create a public method
  - `nfpw-pri-met` - Create a private method
  - `nfpw-pub-amet` - Create a public async method
  - `nfpw-pri-amet` - Create a private async method

Properties default to using `this.page.locator` for POMs and `this.container.locator` in COMs,
provided by their respective base classes. TABbing through starts with the property name, then
`page`/`container`, then locator strategy, and finally that locater itself.

Tabbing through methods start with the method name, then the arguments, then the body of the method.

- Test snippets
  - `nftest` - Creates new test at cursor
  - `nftest-full` - Scaffolds new `*.spec.ts` file
  - `nftestexpect-full` - Same as `nftest-full` plus imports `expect` from `@fixtures/combined`

<div style="text-align: right"><a href="#contents">Top ⬆️</a></div>

## Release Notes

### Version 0.1

- Initial Release

### Version 0.2

- Added [Code Snippets](#code-snippets)
- Updated README instructions with extra links to documentation

### Version 0.3

- [Code Snippets](#code-snippets)
  - Added Test snippets
  - Removed redundent snippets
- Added [Style Guide](#style-guide)
- Updated VSCode ESLint extension version
- Updated README.md
  - General cleanup
  - Removed Barrelling advice to make tests run quicker
    [More Info](https://dev.to/tassiofront/barrel-files-and-why-you-should-stop-using-them-now-bc4)

  ### Version 0.4

- ATF Work started
  - Rebranded repository.
  - Added CI/CD scripts to package.json (lint & format)
  - Added Run Playwright tests & lint checks (runs lint & format) GitHub Actions.
  - Updated README
  - Updated Playwright Test 1.44 > 1.54 (now requires Playwright 1.54)
  - Updated Node 20.12 > 20.19
  - Updated dotENV 16.4 > 16.6
  - Updated Globals 15.1 > 15.15
