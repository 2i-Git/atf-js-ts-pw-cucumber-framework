import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "support/world";
import { LoginPage } from "../../pages/LoginPage";
import { expect } from "playwright/test";

// Scenario 1 : Correct login details

Given("I am on the login page", async function (this: CustomWorld) {
  const login = new LoginPage(this.page);
  await login.goto();
});

When("I attempt to log in with valid login credentials", async function (this: CustomWorld) {
  const login = new LoginPage(this.page);
  const username = process.env.TEST_USERNAME!;
  const password = process.env.TEST_PASSWORD!;
  await login.loginUser(username, password);
});

Then("I should be redirected to the dashboard", async function (this: CustomWorld) {
  const login = new LoginPage(this.page);
  await login.waitForDashboard();
});

// Scenario 2 : Incorrect login details

When("I attempt to log in with invalid login credentials", async function (this: CustomWorld) {
  const login = new LoginPage(this.page);
  const username = process.env.TEST_USERNAME!;
  const incorrect_password = process.env.TEST_INCORRECT_PASSWORD!;
  await login.loginUser(username, incorrect_password);
});

Then("I should see an error message on the login page", async function (this: CustomWorld) {
  const login = new LoginPage(this.page);
  const message = await login.getErrorMessage();
  expect(message).toContain("Invalid email or password");
});
