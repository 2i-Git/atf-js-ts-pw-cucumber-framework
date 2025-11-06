// tests/support/cucumber.ts

import { setWorldConstructor, Before, After, World } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';

// types only
import type { IWorldOptions } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from 'playwright';

class PlaywrightWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    constructor(options: IWorldOptions) {
        super(options);
    }

    async init() {
        this.browser = await chromium.launch({ headless: true });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }

    async cleanup() {
        await this.context?.close();
        await this.browser?.close();
    }
}

setWorldConstructor(PlaywrightWorld);

Before(async function (this: PlaywrightWorld) {
    await this.init();
});

After(async function (this: PlaywrightWorld) {
    await this.cleanup();
});

export { PlaywrightWorld };
