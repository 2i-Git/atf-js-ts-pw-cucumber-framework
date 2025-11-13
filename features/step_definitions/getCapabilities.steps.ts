import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";
import { AirSensorAPI } from "../../api/airSensorAPI";

// Scenario 1 : correct endpoint

Given<CustomWorld>("I have the AIR SOS service endpoint", function () {
  // store AirSensorAPI on *this* world instance (not global)
  this.airSensorAPI = new AirSensorAPI();
});

When<CustomWorld>("I request the GetCapabilities data", async function () {
  // use the instance attached to this world
  this.response = await this.airSensorAPI.getCapabilities();
});

Then<CustomWorld>("I should receive a 200 status code", function () {
  expect(this.response.status()).toBe(200);
});

Then<CustomWorld>("I should see a list of capabilities", async function () {
  const hasCapabilitiesTag = await this.airSensorAPI.hasCapabilitiesTag(this.response);
  expect(hasCapabilitiesTag).toBeTruthy();
});

// Scenario 2: incorrect endpoint

Given<CustomWorld>("I have an incorrect AIR SOS service endpoint", function () {
  // override with a broken endpoint URL
  this.airSensorAPI = new AirSensorAPI("https://uk-air.defra.gov.uk/data/sos/servic");
});

Then<CustomWorld>("I should receive a 404 status code", function () {
  expect(this.response.status()).toBe(404);
});

Then<CustomWorld>("I should see the message {string}", async function (expectedMessage: string) {
  const body = await this.response.text();
  expect(body).toContain(expectedMessage);
});
