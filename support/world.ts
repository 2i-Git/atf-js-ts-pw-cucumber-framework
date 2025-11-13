import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { GovUKSearchPage } from "../pages/GovUKSearchPage";
import { AirSensorAPI } from "api/airSensorAPI";
import { APIResponse } from "@playwright/test";

// each scenario gets its own instance of this class
export class CustomWorld extends World {
  // declare playwright objects as class properties
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  govukPage!: GovUKSearchPage;
  airSensorAPI!: AirSensorAPI;
  response!: APIResponse;

  // takes cucumbers IWorldOptions object and initialises the base World class
  // enables access to cucumber utilities
  constructor(options: IWorldOptions) {
    super(options);
  }

  // launches new playwright browser
  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext({
      ignoreHTTPSErrors: true, // bypass cert verification
    });
    this.page = await this.context.newPage();
  }

  async cleanup() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
