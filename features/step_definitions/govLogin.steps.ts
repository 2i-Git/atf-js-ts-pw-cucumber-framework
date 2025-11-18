import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "support/world";
import { GovLoginPage } from "../../pages/GovLoginPage";
import { getCredentialByRow } from "../../support/loginCredentialsLoader";

Given("I am on the login page", async function (this: CustomWorld) {
  const login = new GovLoginPage(this.page);
  await login.goto();
});

When(
  "I attempt to log in using CSV row {int}",
  async function (this: CustomWorld, rowIndex: number) {
    const login = new GovLoginPage(this.page);
    const { username, password } = getCredentialByRow(rowIndex);
    await login.loginUser(username, password);
  }
);

Then("I should be redirected to the dashboard", async function (this: CustomWorld) {
  const login = new GovLoginPage(this.page);
  await login.waitForDashboard();
});
