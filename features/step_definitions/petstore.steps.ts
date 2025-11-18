import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world";
import { PetStoreAPI, Pet } from "../../api/petStoreAPI";

// Background

Given<CustomWorld>("I have access to the PetStore API", function () {
  this.petStoreAPI = new PetStoreAPI(this);
});

// Pet Scenarios

When<CustomWorld>(
  "I add a new pet with the following details:",
  async function (dataTable: DataTable) {
    const data = dataTable.rowsHash();

    const pet: Pet = {
      name: data.name,
      photoUrls: [data.photoUrl],
      status: data.status as "available" | "pending" | "sold",
    };

    this.response = await this.petStoreAPI.addPet(pet);
    this.testData = await this.response.json();
  }
);

Then<CustomWorld>("the pet should be created successfully", function () {
  expect(this.response.status()).toBe(200);
});
//
Then<CustomWorld>("the response should contain the pet details", function () {
  expect(this.testData).toHaveProperty("id");
  expect(this.testData).toHaveProperty("name");
  expect(this.testData).toHaveProperty("status");
});

Given<CustomWorld>("a pet exists with ID {int}", async function (petId: number) {
  this.testPetId = petId;
});

When<CustomWorld>("I request the pet by ID {int}", async function (petId: number) {
  this.response = await this.petStoreAPI.getPetById(petId);
});



Then<CustomWorld>(
  "the response status code should be {int}",
  function (expectedStatus: number) {
    const actualStatus = this.response.status();
    console.log(
      "STATUS STEP BOUND (new wording), expected:",
      expectedStatus,
      "actual:",
      actualStatus
    );
    expect(actualStatus).toBe(expectedStatus);
  }
);

Then<CustomWorld>(
  "the response body should contain a pet object",
  async function () {
    console.log("PET OBJECT STEP BOUND (new wording)");
    const data = await this.response.json();
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name");
  }
);

