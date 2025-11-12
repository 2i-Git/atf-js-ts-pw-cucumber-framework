import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CountriesAPI } from "../api/countriesAPI";

let countryList: string[];

When("I fetch the region {string}", async function (region: string) {
  const api = new CountriesAPI();
  countryList = await api.getCountriesByRegion(region);
});

Then("I should get a list of countries", function () {
  expect(Array.isArray(countryList)).toBeTruthy(); // checks countryList is an array
  expect(countryList.length).toBeGreaterThan(0);
  console.log(`Number of countries in region: ${countryList.length}`);
});
