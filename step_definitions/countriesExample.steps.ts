import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CountriesAPI } from "../api/countriesAPI";

let countryList: string[];
let selectedRegion: string;

When("I fetch the region {string}", async function (region: string) {
  selectedRegion = region;
  const api = new CountriesAPI(this);
  this.attach(`GET https://restcountries.com/v3.1/region/${region}`, "text/plain");
  countryList = await api.getCountriesByRegion(region);
  this.attach(JSON.stringify(countryList, null, 2), "application/json");

});

Then("I should get a list of countries", function () {
  expect(Array.isArray(countryList)).toBeTruthy();
  expect(countryList.length).toBeGreaterThan(0);
  console.log(`Number of countries in ${selectedRegion}: ${countryList.length}`);
  this.attach(`Number of countries in ${selectedRegion}: ${countryList.length}`, "text/plain");
});

