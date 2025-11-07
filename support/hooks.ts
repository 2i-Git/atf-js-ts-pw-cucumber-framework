import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "./world";

setDefaultTimeout(60 * 1000); //default timeout for each step

// initialise playwright broswer and context before each scenario
Before(async function (this: CustomWorld) {
  await this.init();
});

// close playwright context and broswer after each scenario
After(async function (this: CustomWorld) {
  await this.cleanup();
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
