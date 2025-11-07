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
    - [`cucumber.js`](#cucumberjs)
  - [Folder Structure](#folder-structure)
    - [`components`](#components)
    - [`enums`](#enums)
    - [`features`](#features)
    - [`fixtures`](#fixtures)
    - [`helpers`](#helpers)
    - [`models`](#models)
    - [`pages`](#pages)
    - [`support`](#support)
  - [Cucumber (BDD) Integration](#cucumber-bdd-integration)
    - [Installation](#cucumber-installation)
    - [Running BDD Tests](#running-bdd-tests)
    - [Allure Reporting for Cucumber](#allure-reporting-for-cucumber)
  - [Style Guide](#style-guide)
    - [Identifiers](#identifiers)
    - [Filenames](#filenames)
    - [Code Style](#code-style)
      - [Write Simple Code](#write-simple-code)
      - [Guard Clauses](#guard-clauses)
  - [Code Snippets](#code-snippets)
  - [Allure Report](#allure-reporting)
  - [Release Notes](#release-notes)
    - [Version 0.1](#version-01)
    - [Version 0.2](#version-02)
    - [Version 0.3](#version-03)
    - [Version 0.4](#version-04)

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

If you don't see version numbers or get an error,
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

#### Cucumber BDD Dependencies

If you plan to use Cucumber for BDD testing, also install:

```bash
npm install -D @cucumber/cucumber ts-node tsconfig-paths allure-cucumberjs
```

### Files

Download the following files and **_merge_** them into the project.

- [`eslint.config.js`](#eslintconfigjs)
- [`.prettier.config.js`](#prettierconfig)
- [`playwright.config.js`](#playwrightconfig)
- [`tsconfig.json`](#tsconfig)
- [`cucumber.js`](#cucumberjs) (if using Cucumber BDD)

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
- [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete)
  (Optional - for BDD)
  - Provides syntax highlighting and autocomplete for `.feature` files

<div style="text-align: right"><a href="#contents">Top ⬆️</a></div>

## Files

- [`eslint.config.js`](#eslintconfigjs) - ESLint config
- [`.prettier.config.js`](#prettierconfig) - Prettier config
- [`playwright.config.js`](#playwrightconfig) - Playwright config
- [`tsconfig.json`](#tsconfig) - Typescript config
- [`cucumber.js`](#cucumberjs) - Cucumber config (for BDD testing)

## Commands

### Playwright Commands

- `npx playwright test` - Runs Playwright's test runner to execute your browser-based end-to-end
  tests and report results.
- `npx playwright test --headed` - Runs tests in headed mode (browser visible)
- `npx playwright test --project=chromium` - Runs tests on specific browser

### Cucumber Commands

- `npx cucumber-js` - Runs Cucumber's test runner to execute your BDD feature files
- `npx cucumber-js --tags "@smoke"` - Only runs scenarios with the `@smoke` tag
- `npx cucumber-js --tags "not @wip"` - Runs all scenarios except those tagged with `@wip`
- `npx cucumber-js --tags "@ui and @regression"` - Runs scenarios with both tags
- `npm run test` - Runs Cucumber tests using the configured npm script
- `npm run test:allure` - Runs Cucumber tests with Allure reporting enabled

### Linting and Formatting Commands

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

**Important for Cucumber:** Ensure `features/**/*.ts` is included in the `include` array so
TypeScript recognizes your step definitions:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["components/*"],
      "@enums/*": ["enums/*"],
      "@fixtures/*": ["fixtures/*"],
      "@helpers/*": ["helpers/*"],
      "@models/*": ["models/*"],
      "@pages/*": ["pages/*"]
    }
  },
  "include": ["features/**/*.ts", "**/*.ts"]
}
```

---

### `cucumber.js`

Configuration file for Cucumber BDD testing. This file tells Cucumber where to find step
definitions, how to run TypeScript files, and which reporters to use.

**Example configuration:**

```json
{
  "default": {
    "require": ["features/**/*.ts", "support/**/*.ts"],
    "requireModule": ["ts-node/register", "tsconfig-paths/register"],
    "format": ["progress", "allure-cucumberjs/reporter"],
    "publishQuiet": true
  }
}
```

**Key settings:**

- `require` - Points to step definitions and support code locations
- `requireModule` - Enables TypeScript execution and path alias support
- `format` - Configures console output and Allure report generation
- `publishQuiet` - Suppresses Cucumber's cloud sharing prompt

#### [Documentation](https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md)

<div style="text-align: right"><a href="#contents">Top ⬆️</a></div>

## Folder Structure

More information can be found in the `docs` folder in the
[`project-structure.md`](./docs/project-structure.md) file.

### `components`

**Somewhere to store Component Object Models (COMs)**

By default, this folder contains a `BaseComponent` POM.

### `enums`

**Somewhere to store Enumerated objects (enums)**

### `features`

**Somewhere to store Cucumber feature files and step definitions (for BDD testing)**

This folder contains:

- **`.feature` files** - Gherkin scenarios written in plain English that describe test cases
- **`step_definitions/` or `steps/`** - TypeScript files that implement the steps from feature files

**Example feature file** (`features/search/search.feature`):

```gherkin
Feature: Search on GOV.UK

  @smoke
  Scenario: Search for a service
    Given I open the GOV.UK homepage
    When I search for "passport"
    Then I should see results containing "passport"
```

**Example step definition** (`features/step_definitions/search.steps.ts`):

```typescript
import { Given, When, Then } from "@cucumber/cucumber";
import { GovUKSearchPage } from "@pages/GovUKSearchPage";

Given("I open the GOV.UK homepage", async function () {
  const page = this.page; // from support/world.ts
  const govPage = new GovUKSearchPage(page);
  await govPage.goto();
});
```

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

### `support`

**Somewhere to store Cucumber support files (for BDD testing)**

This folder contains:

- **`world.ts`** - Custom Cucumber World where Playwright browser, context, and page are attached so
  each scenario has its own isolated browser setup
- **`hooks.ts`** - Before and After hooks for setup/teardown, screenshot capture on failure, and
  Allure attachment

**Example hooks file:**

```typescript
import fs from "fs";
import path from "path";
import { After, Before } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";

Before(async function () {
  this.browser = await chromium.launch();
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (scenario) {
  if (scenario.result?.status === "FAILED" && this.page) {
    const screenshot = await this.page.screenshot();
    const dir = "./allure-results";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const fileName = `screenshot-${Date.now()}.png`;
    fs.writeFileSync(path.join(dir, fileName), screenshot);
    await this.attach(screenshot, "image/png");
  }
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
```

<div style="text-align: right"><a href="#contents">Top ⬆️</a></div>

## Cucumber (BDD) Integration

This framework supports running end-to-end tests using Cucumber (Gherkin) on top of Playwright and
TypeScript. This allows delivery teams to write business-readable scenarios (`.feature` files) while
using the same Page Objects, helpers, and TypeScript configuration as the rest of the project.

### Cucumber Installation

Install the required Cucumber dependencies:

```bash
npm install -D @cucumber/cucumber ts-node tsconfig-paths allure-cucumberjs
```

**What each package does:**

- `@cucumber/cucumber` - The Cucumber test runner
- `ts-node` - Allows Cucumber to run `.ts` step files directly without compilation
- `tsconfig-paths` - Makes Cucumber respect path aliases from `tsconfig.json` (e.g., `@pages/*`,
  `@helpers/*`)
- `allure-cucumberjs` - Cucumber formatter for Allure report generation

### NPM Scripts for Cucumber

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "cucumber-js --format progress --exit",
    "test:allure": "cucumber-js --format progress --format allure-cucumberjs/reporter --exit",
    "test:full": "npm run test:allure && npm run allure:generate && npm run allure:open",
    "test:report": "npm run test:allure && npm run allure:serve"
  }
}
```

**Script descriptions:**

- `test` - Runs Cucumber tests with progress output
- `test:allure` - Runs tests and generates Allure-compatible results
- `test:full` - Complete workflow: run tests → generate report → open in browser
- `test:report` - Run tests and serve report immediately

> **Note:** The `--exit` flag ensures Cucumber terminates cleanly even if async handles remain open,
> which is important for CI/CD pipelines.

### Running BDD Tests

**Run all feature files:**

```bash
npx cucumber-js
```

or

```bash
npm run test
```

**Run tests with specific tags:**

```bash
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "not @wip"
npx cucumber-js --tags "@ui and @regression"
```

> **Important:** Tag filtering happens at the Cucumber level, not Playwright level. Keep tag names
> consistent across feature files.

### Allure Reporting for Cucumber

Cucumber integrates with Allure differently than Playwright's native `allure-playwright`.

**Generate Allure results:**

```bash
npm run test:allure
```

This creates `./allure-results/` containing test data.

**Generate HTML report:**

```bash
npm run allure:generate
```

This creates `./allure-report/` with the HTML report.

**Open the report:**

```bash
npm run allure:open
```

**Troubleshooting empty reports:**

- Verify the formatter is `allure-cucumberjs/reporter` in `cucumber.js`
- Ensure at least one scenario ran successfully
- Check that `allure-results/` is not blocked by OneDrive or corporate sync software

> **⚠️ Windows Warning:** On Windows setups with OneDrive-synchronized folders, Allure may fail to
> write or open reports. Generate reports to a local, non-synchronized path or run from a CI agent.

<div style="text-align: right"><a href="#contents">Top ⬆️</a></div>

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

## Allure Reporting

Allure Reporting has been integrated into this framework to replace the default Playwright HTML
reporter.  
It provides an **interactive and visually rich** way to analyse your test runs, attachments, steps,
and failure details.

---

## Installation

Before running the commands below, ensure the required dependencies are installed:

```bash
npm install -D allure-playwright allure-commandline rimraf
```

- **allure-playwright** – integrates Allure with Playwright's test runner.
- **allure-commandline** – provides the CLI for generating and opening Allure reports.
- **rimraf** – safely removes folders (used for cleaning old results across all platforms).

> **Note:** Allure requires **Java** to generate reports. Verify it's installed by running:

```bash
java -version
```

## Available Scripts

| Command                   | Description                                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run test:allure`     | Cleans any previous results and runs all Playwright tests using the Allure reporter.                     |
| `npm run allure:generate` | Generates a new Allure HTML report from the latest test results.                                         |
| `npm run allure:open`     | Opens the generated Allure report in your default browser.                                               |
| `npm run clean:reports`   | Removes all previous `allure-results` and `allure-report` folders.                                       |
| `npm run allure:full`     | Performs a full cycle: cleans old results, runs tests, generates the report, and opens it automatically. |

## Usage Example

### Run tests and generate the report

```bash
npm run test:allure
npm run allure:generate
npm run allure:open
```

### Clean reports manually

```bash
npm run clean:reports
```

### Run the full cycle in one go

```bash
npm run allure:full
```

---

## Output Paths

Reports are generated in:

```
./allure-results/
./allure-report/
```

## Benefits

Allure provides detailed **step-by-step insights**, including:

- Screenshots and traces
- Execution history
- Attachments and logs

This makes it ideal for **local debugging** and **CI/CD pipeline integration**.

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

### Version 0.5

- Added Cucumber (BDD) Integration
  - Added `@cucumber/cucumber`, `ts-node`, `tsconfig-paths`, and `allure-cucumberjs` dependencies
  - Added `cucumber.js` configuration file
  - Added `features/` folder structure for feature files and step definitions
  - Added `support/` folder for Cucumber World and hooks
  - Updated `tsconfig.json` to include `features/**/*.ts`
  - Added Cucumber-specific npm scripts
  - Integrated Allure reporting for Cucumber runs
  - Updated README with comprehensive Cucumber documentation

<div style="text-align: right"><a href="#contents">Top ⬆️</a></div>
