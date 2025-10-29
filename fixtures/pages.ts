export { expect } from "@playwright/test";

import { BasePage } from "@pages/base";
import { test as testBase } from "./data";

type Pages = {
  example: BasePage;
};

export const test = testBase.extend<Pages>({});
