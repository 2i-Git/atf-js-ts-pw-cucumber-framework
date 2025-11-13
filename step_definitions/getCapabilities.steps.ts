import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { AirSensorAPI } from "../api/airSensorAPI";
import { APIResponse } from "@playwright/test";

let airSensorAPI: AirSensorAPI;
let response: APIResponse;

Given("I have the AIR SOS service endpoint", function () {
  airSensorAPI = new AirSensorAPI();
});

When("I request the GetCapabilities data", async function () {
  response = await airSensorAPI.getCapabilities();
});

Then("I should receive a 200 status code", function () {
  expect(response.status()).toBe(200);
});

Then("I should see a list of capabilities", async function () {
  const hasCapabilitiesTag = await airSensorAPI.hasCapabilitiesTag(response);
  expect(hasCapabilitiesTag).toBeTruthy();
});
