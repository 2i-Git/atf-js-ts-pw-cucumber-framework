import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";
import { generatePet, generateSimplePet } from "../../models/factories/Petstore.faker";
import { Pet } from "../../models/Petstore.models"

// Background

Given<CustomWorld>("I have access to the PetStore API", function () { expect(this.petStoreAPI).toBeDefined(); });

// Pet Scenarios

When<CustomWorld>("I add a new pet with name {string}", async function (petName: string) {
  // Use a fixed test ID to ensure consistency across scenarios
  const testId = 12345;
  const pet: Pet = {
    id: testId,
    name: petName,
    photoUrls: ["https://example.com/photo.jpg"],
    status: "available",
  };

  this.response = await this.petStoreAPI.addPet(pet);
  const data = (await this.response.json()) as Record<string, unknown>;
  this.testData = data;
  this.testPetId = data.id as number;// Store the pet ID for later use 
});

Given<CustomWorld>("a valid pet ID", function () {
  // Use the same fixed ID as the first scenario
  this.testPetId = 12345;
  expect(this.testPetId).toBeDefined();
  expect(this.testPetId).toBeGreaterThan(0);
});

// Additional Faker-based step definitions

When<CustomWorld>("I add a completely randomized pet", async function () {
  // Generate a fully randomized pet with all fields populated by Faker
  const pet: Pet = generatePet();

  this.response = await this.petStoreAPI.addPet(pet);
  const data = (await this.response.json()) as Record<string, unknown>;
  this.testData = data;
  this.testPetId = data.id as number;
});

When<CustomWorld>("I add a simple pet", async function () {
  // Generate a minimal pet with only required fields
  const pet: Pet = generateSimplePet();

  this.response = await this.petStoreAPI.addPet(pet);
  const data = (await this.response.json()) as Record<string, unknown>;
  this.testData = data;
  this.testPetId = data.id as number;
});

When<CustomWorld>("I request the pet by ID", async function () {
  this.response = await this.petStoreAPI.getPetById(this.testPetId);
  this.testData = (await this.response.json()) as Record<string, unknown>;
});

Then<CustomWorld>("the pet exists", function () {
  expect(this.response.status()).toBe(200);
  expect(this.testData).toHaveProperty("id");
  expect(this.testData).toHaveProperty("name");
  expect(this.testData.id).toBe(this.testPetId);
});

Then<CustomWorld>("the response status code should be {int}", function (expectedStatus: number) {
  const actualStatus = this.response.status();
  console.log(
    "STATUS STEP BOUND (new wording), expected:",
    expectedStatus,
    "actual:",
    actualStatus
  );
  expect(actualStatus).toBe(expectedStatus);
});

Then<CustomWorld>("the response body should contain a pet object", function () {
  console.log("PET OBJECT STEP BOUND (new wording)");
  const data = this.response.json();
  expect(data).toHaveProperty("id");
  expect(data).toHaveProperty("name");
});
