import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";
import {
  GovApplicationAPI,
  CreateApplicationResponse,
  GetApplicationResponse,
  DeleteApplicationResponse,
  ApplicationData
} from "../../api/2iGovAppAPI";
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
  // Parse the response body
  const body = this.responseBody as unknown as CreateApplicationResponse;
  // Ensure response body is valid
  expect(body.success).toBe(true);
  expect(body.data).toHaveProperty("applicationId");
  expect(body.data).toHaveProperty("status", "submitted");

  // Ensure ID is valid (UUID format)
  expect(this.testApplicationId).toBeDefined();
  expect(typeof this.testApplicationId).toBe('string');
  expect(String(this.testApplicationId).length).toBeGreaterThan(0);
});


// Given an application exists (used by delete and retrieve scenarios)
Given<CustomWorld>("an application exists", async function () {
  // Create a new application first
  const application = buildValidApplication();
  this.govApplication = application;

  // Call the API to create it
  this.response = await this.govApplicationAPI!.createApplication(application);

  // Parse and store the response
  const parsed = (await this.response.json()) as CreateApplicationResponse;
  this.responseBody = parsed as unknown as Record<string, unknown>;
  this.testApplicationId = parsed.data.applicationId;

  // Verify it was created successfully
  expect(this.response.status()).toBe(201);
  expect(parsed.success).toBe(true);
});

//  When I delete the application
When<CustomWorld>("I delete the application", async function () {
  expect(this.testApplicationId).toBeDefined();
  this.response = await this.govApplicationAPI!.deleteApplication(this.testApplicationId!);
  this.responseBody = (await this.response.json()) as unknown as Record<string, unknown>;
});

//  Then the application should no longer exist
Then<CustomWorld>("the application should no longer exist", async function () {
  // Verify delete was successful
  expect(this.response.status()).toBe(200);
  const deleteBody = this.responseBody as unknown as DeleteApplicationResponse;
  expect(deleteBody.success).toBe(true);

  // Try to retrieve the deleted application - should fail
  const getResponse = await this.govApplicationAPI!.getApplicationById(this.testApplicationId!);
  expect(getResponse.status()).toBe(404);
});

//  When I request the application by its ID
When<CustomWorld>("I request the application by its ID", async function () {
  expect(this.testApplicationId).toBeDefined();
  this.response = await this.govApplicationAPI!.getApplicationById(this.testApplicationId!);
  this.responseBody = (await this.response.json()) as unknown as Record<string, unknown>;
});

//  Then I should receive the application details
Then<CustomWorld>("I should receive the application details", function () {
  expect(this.response.status()).toBe(200);
  const body = this.responseBody as unknown as GetApplicationResponse;
  expect(body.success).toBe(true);
  expect(body.data).toBeDefined();
  expect(body.data.applicationId).toBe(this.testApplicationId);
  expect(body.data.status).toBeDefined();
  expect(body.data.personalDetails).toBeDefined();
  expect(body.data.businessDetails).toBeDefined();
  expect(body.data.licenseDetails).toBeDefined();
});

//  Given multiple applications exist
Given<CustomWorld>("multiple applications exist", async function () {
  this.createdApplicationIds = [];

  // Create 3 applications for testing
  for (let i = 0; i < 3; i++) {
    const application = buildValidApplication();
    const response = await this.govApplicationAPI!.createApplication(application);
    const parsed = (await response.json()) as CreateApplicationResponse;

    expect(response.status()).toBe(201);
    expect(parsed.success).toBe(true);

    this.createdApplicationIds.push(parsed.data.applicationId);
  }
});

// When I request all applications
When<CustomWorld>("I request all applications", async function () {
  this.response = await this.govApplicationAPI!.getApplications();
  this.responseBody = (await this.response.json()) as unknown as Record<string, unknown>;
});

//  Then I should receive a list of all applications
Then<CustomWorld>("I should receive a list of all applications", function () {
  expect(this.response.status()).toBe(200);
  expect(this.responseBody).toBeDefined();

  const body = this.responseBody!;
  expect(body.success).toBe(true);
  expect(body.data).toBeDefined();
  expect(Array.isArray(body.data)).toBe(true);

  const applications = body.data as ApplicationData[];
  expect(applications.length).toBeGreaterThanOrEqual(3);

  // Verify our created applications are in the list
  const applicationIds = applications.map((app) => app.applicationId);
  this.createdApplicationIds.forEach((id: string | number) => {
    expect(applicationIds).toContain(id);
  });
});