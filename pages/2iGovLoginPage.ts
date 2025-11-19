import { Page } from "@playwright/test";
import { BasePage } from "./base";

export class GovLoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto("/login");
  }

  async enterUsername(username: string) {
    await this.page.fill('input[name="email"]', username);
  }

  async enterPassword(password: string) {
    await this.page.fill('input[name="password"]', password);
  }

  async submit() {
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }

  async loginUser(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.submit();
  }

  async waitForDashboard() {
    await this.page.waitForURL(`${this.baseUrl}/personal-details`);
  }

  async getErrorMessage() {
    return this.page.locator(".govuk-error-summary").textContent();
  }
}
