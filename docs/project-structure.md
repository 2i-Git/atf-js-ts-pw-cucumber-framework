````md
# Framework Architecture

This document explains the layers of the test automation framework, how they fit together, and how
to work within each layer when adding or maintaining tests.

The framework is built around these key ideas:

- Business-readable tests (Cucumber / Gherkin)
- Clear separation between **what** we test (features) and **how** we drive the system (page
  objects, API clients, helpers)
- Reusable utilities for configuration, data, assertions, logging, and reporting
- Consistent reporting and traceability (Allure, tags, versioning)

---

## High-level overview

At a high level, the framework looks like this:

```text
+----------------------------------------------------------+
|                 Business Specifications                  |
|           (Cucumber .feature files + tags)               |
+---------------------------+------------------------------+
                            |
                            v
+----------------------------------------------------------+
|             Step Definitions and Hooks Layer             |
|     (Given/When/Then glue code, shared setup/teardown)   |
+---------------------------+------------------------------+
                            |
                            v
+----------------------------------------------------------+
|              World / Context and Orchestration           |
|   (Playwright browser/context/page lifecycle, state)     |
+---------------------------+------------------------------+
                            |
                            v
+----------------------------------------------------------+
|            Interaction Layer: Pages, Components,         |
|                API Clients and Models                    |
+---------------------------+------------------------------+
                            |
                            v
+----------------------------------------------------------+
|        Utilities, Logging, Reporting and Config          |
| (Allure, ApiLogger, helpers, configs, Docker, CI)        |
+----------------------------------------------------------+
```
````

Each layer has a clear responsibility and maps directly to the folders in this repository.

## Folders and responsibilities

### Business specification layer (`features`)

**Folder(s):** `features/`, `features/**/*.feature`

**What it does**

- Holds Gherkin `.feature` files that describe behaviour in plain language.
- Uses tags (`@smoke`, `@regression`, `@govsearch`, `@wikisearch`, etc.) to organise suites.

**How it is used**

- Product and testers review behaviour here.
- New flows start as new scenarios or features.
- The wording should stay stable even if the implementation changes.

**Key rule** This layer describes **what** the system should do, not **how** it is implemented.

---

### Step definitions and hooks (`features/step_definitions`, `support`)

**Folder(s):**

- `features/step_definitions/`
- `support/hooks.ts`

**What it does**

- Maps `Given/When/Then` lines to TypeScript functions.
- Runs cross-cutting setup/teardown (`Before`, `After`) for each scenario.
- Attaches screenshots and logs to Allure on failures.

**How it is used**

- Step definitions call into page objects, components and API clients rather than using raw
  locators.
- Hooks manage opening/closing browsers, cleaning up state, and handling reporting.

**Key rule** Keep step definitions thin: they delegate to the interaction layer and helpers instead
of doing all the work themselves.

---

### World / context and orchestration (`support/world.ts`)

**Folder(s):** `support/world.ts`

**What it does**

- Implements the Cucumber World.
- Owns the Playwright `browser`, `context`, and `page`.
- Carries scenario-scoped state (for example `this.apiResponse`, shared data, page objects).

**How it is used**

- Step definitions access the browser and helpers through `this` (the World instance).
- Ensures each scenario runs in an isolated context.

**Key rule** World orchestrates resources and state; it is not the place for business logic
assertions.

---

### Interaction layer: Pages, Components, API and Models (`pages`, `components`, `api`, `models`)

**Folders:**

- `pages/` – Page Object Models (POMs) for entire pages or major screens.
- `components/` – Component Object Models (COMs) for reusable UI fragments (headers, forms,
  widgets).
- `api/` – API clients and utilities (`BaseAPI`, `ApiLogger`) for calling backend services.
- `models/` – Interfaces and types used by pages, components and API clients.

**What it does**

- Encapsulates all the interaction with the System Under Test:
  - UI interactions via Playwright (`goto`, `click`, `fill`, `locator`).
  - API calls via Playwright’s request API and `BaseAPI`.

- Hides locators and endpoints behind intention-revealing methods:
  - `govUkSearchPage.searchFor("passport")`
  - `wikiPage.search(term)`
  - `api.getCountries()`

**How it is used**

- Step definitions create and call POMs/COMs instead of touching the DOM directly.
- API-related steps use `BaseAPI` and `ApiLogger` for consistent logging into Allure.
- Models define the shape of data passed around (for example response bodies, DTOs).

**Key rule** Locators, selectors and request details live here, not in step definitions.

---

### Utilities, logging, reporting and configuration (`api`, `support`, config files, `reports`)

**Folder(s):**

- `api/apiLogger.ts` – Logging of requests/responses to Allure.
- `support/hooks.ts` – Screenshot capture and Allure attachments.
- `playwright.config.ts` – Playwright configuration (browsers, timeouts, base URL).
- `cucumber.json` – Cucumber configuration (paths, reporters).
- `tsconfig.json`, `eslint.config.js`, `.prettierrc.json` – TypeScript, linting and formatting
  config.
- `reports/` – Generated `allure-results` and `allure-report` output.

**What it does**

- Provides shared concerns:
  - API logging and request/response attachments.
  - Screenshot handling and failure diagnostics.
  - Consistent configuration for Playwright, Cucumber and TypeScript.
  - Allure integration and report generation.

**How it is used**

- Hooks and ApiLogger send structured information to Allure to aid debugging.
- CI pipelines run the npm scripts defined in `package.json` (lint, format, test, Allure).
- The `reports` folder holds artefacts and should not be committed.

**Key rule** This layer supports the tests; it should not contain test scenarios or business rules.

---

### Tooling and execution: npm scripts, Docker and CI

**What it does**

- `package.json` scripts define how to:
  - Run all tests.
  - Run tagged subsets (`@smoke`, `@wip`, etc.).
  - Generate and open Allure reports.
  - Run linting and formatting.

- The `Dockerfile` defines a repeatable environment for running tests in containers.
- CI (for example GitHub Actions) can call these scripts for consistent automation.

**How it is used**

- Developers run tests locally via npm scripts.
- CI pipelines run the same scripts in headless mode.
- Docker provides a consistent environment for both local runs and CI if needed.

**Key rule** Tooling should use the public surface of the framework (npm scripts, configs), not
internal implementation details.

---

### Adding new tests within this architecture

## Execution flow of a scenario

When you run a scenario, the framework goes roughly like this:

1. **Cucumber runner** discovers `.feature` files based on `cucumber.js` config.
2. For each scenario:
   - `BeforeAll` / `Before` hooks run (e.g. start browser, prepare data).
   - A **World** instance is created and initialised (browser/context/page, helpers).

3. Step text in the feature file is matched to **step definitions**.
4. Each step definition:
   - Uses the **World** to access `page`, page objects, or API clients.
   - Delegates real work to page objects / helpers.

5. Page objects and helpers:
   - Interact with the SUT via Playwright (UI) and/or APIs.

6. Assertions:
   - Performed in steps or helper methods to check expected outcomes.

7. On failure:
   - Hooks attach screenshots, logs, API traces to Allure.

8. After the scenario:
   - `After` hook cleans up (close page/context/browser).

9. Allure:
   - Collects results, environment (ATF/SUT versions), and attachments into a report.

---

## How to extend the framework safely

When adding **a new test flow**, follow these rules:

1. Start in `features/`:
   - Write a new `.feature` file or scenario.
   - Use clear Given/When/Then and appropriate tags.

2. Add or reuse step definitions:
   - Only implement new steps if there isn’t an existing one.
   - Keep them small and delegate to page objects/helpers.

3. Add / update page objects:
   - If a new screen is involved, create a `Page` class in `pages/`.
   - Hide locators and interaction details behind methods.

4. Use utilities:
   - Reuse helpers for API calls, data, assertions where possible.
   - If you see repeated patterns, extract them into a helper.

5. Wire into CI:
   - If needed, add a tag and CI job to run your new suite (e.g. `@visa`).

By respecting these layers, the framework stays readable, maintainable, and easy to extend.

---

If you want, next step I can take your current `README.md` and weave this in so it matches your
exact folder names and existing sections. ::contentReference[oaicite:0]{index=0}
