import { Locator, Page } from "@playwright/test";

export class BaseComponent {
  public container: Locator;
  public page: Page;

  constructor(container: Locator) {
    this.container = container;
    this.page = container.page();
  }
}
