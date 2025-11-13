import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { CustomWorld } from "./world";


setDefaultTimeout(60 * 1000); //default timeout for each step

// initialise playwright broswer and context before each scenario
Before(async function (this: CustomWorld) {
  await this.init();
});



// close playwright context and broswer after each scenario and attach screenshot on failure
After(async function (this: CustomWorld) {
  // attach screenshot always
  const screenshot = await this.page.screenshot();
  this.attach(screenshot, "image/png");


  // cleanup playwright objects

  await this.cleanup();
});
