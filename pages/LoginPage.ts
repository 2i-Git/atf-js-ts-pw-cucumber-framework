import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("http://localhost:3000/login");
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
    await this.page.waitForURL("http://localhost:3000/personal-details");
  }

  async getErrorMessage() {
    return this.page.locator(".govuk-error-summary").textContent();
  }
}
