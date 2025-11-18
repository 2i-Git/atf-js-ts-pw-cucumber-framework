import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";
import { PetStoreAPI, Pet } from "../../api/petStoreAPI";

// Background
Given<CustomWorld>("Pet endpoint", function () {
  this.petStoreAPI = new PetStoreAPI(this);
});

// Scenario: Create a new pet
When<CustomWorld>("I add a new pet named {string}", async function (petName: string) {
  const pet: Pet = {
    name: petName,
    photoUrls: ["https://example.com/photo.jpg"],
    status: "available",
  };

  this.response = await this.petStoreAPI.addPet(pet);
  this.testData = await this.response.json();
});

Then<CustomWorld>("the pet exists", function () {
  expect(this.response.status()).toBe(200);
  expect(this.testData).toHaveProperty("id");
  expect(this.testData).toHaveProperty("name");
});
