import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";
import { GovApplicationAPI, CreateApplicationResponse } from "../../api/2iGovAppAPI";
import { buildValidApplication } from "../../support/2iGovApplicationBuilder";

Given<CustomWorld>("I have access to the Application API", function () {
  this.govApplicationAPI = new GovApplicationAPI(this);
});

When<CustomWorld>("I submit a valid application", async function () {
  const application = buildValidApplication();
  this.govApplication = application;

  // Call the API
  this.response = await this.govApplicationAPI!.createApplication(application);

  // Parse the JSON body (Playwright returns `any`, so we assert types)
  const parsed = (await this.response.json()) as CreateApplicationResponse;

  // Store structured test data
  this.responseBody = parsed as unknown as Record<string, unknown>;
  this.testData = parsed as unknown as Record<string, unknown>;

  // Extract ID safely
  this.testApplicationId = parsed.data.applicationId;
});

Then<CustomWorld>("the application exists", function () {
  expect(this.response.status()).toBe(201);

  const body = this.responseBody as unknown as CreateApplicationResponse;

  expect(body.success).toBe(true);
  expect(body.data).toHaveProperty("applicationId");
  expect(body.data).toHaveProperty("status", "submitted");

  // Ensure ID is valid (UUID format)
  expect(this.testApplicationId).toBeDefined();
  expect(typeof this.testApplicationId).toBe('string');
  expect(String(this.testApplicationId).length).toBeGreaterThan(0);
});


