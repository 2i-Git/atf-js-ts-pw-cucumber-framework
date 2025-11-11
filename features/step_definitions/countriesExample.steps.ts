import { When, Then } from "@cucumber/cucumber";
import { request, APIResponse } from "playwright";
import { expect } from "@playwright/test";

interface Country {
  name: {
    common: string;
    official: string;
  };
  region: string;
  [key: string]: unknown;
}

let response: APIResponse;
let countryList: Country[];

When("I fetch the region {string}", async function (region: string) {
  const apiContext = await request.newContext();

  response = await apiContext.get(`https://restcountries.com/v3.1/region/${region}`);

  const json = (await response.json()) as Country[]; // casting safely
  countryList = json;
});

Then("I should get a list of countries", function () {
  const count = countryList.length;
  console.log("Total countries:", count);

  expect(count).toBeGreaterThan(0);
});
