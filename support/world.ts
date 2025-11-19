import { IWorldOptions, setWorldConstructor, World } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { PetStoreAPI } from "../api/petStoreAPI";
import { APIResponse } from "@playwright/test";

import { currentEnv, TestEnvironment } from "../config/env.config";

// each scenario gets its own instance of this class
export class CustomWorld extends World {
  // declare playwright objects as class properties
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  petStoreAPI!: PetStoreAPI;
  response!: APIResponse;
  envName: TestEnvironment;

  // Test data storage for scenarios
  testData!: Record<string, unknown>;
  testPetId!: number;
  testOrderId!: number;
  testUsername!: string;
  testPassword!: string;

  // takes cucumbers IWorldOptions object and initialises the base World class
  // enables access to cucumber utilities
  constructor(options: IWorldOptions) {
    super(options);

    this.envName = currentEnv.name;
  }

  // launches new playwright browser
  async init() {
    this.browser = await chromium.launch({ headless: true });
    this.context = await this.browser.newContext({
      ignoreHTTPSErrors: true, // bypass cert verification
    })
      ;

    this.page = await this.context.newPage();
    // Initialise the PetStoreAPI
    this.petStoreAPI = new PetStoreAPI(this);
    await this.petStoreAPI.init();
  }

  async cleanup() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();

    // Cleanup API context to prevent memory leaks
    if (this.petStoreAPI) {
      await this.petStoreAPI.dispose();
    }
  }
}

setWorldConstructor(CustomWorld);
