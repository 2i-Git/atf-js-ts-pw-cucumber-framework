import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";
import { GovUKSearchPage } from "../../pages/GovUKSearchPage";

Given<CustomWorld>("the user is on the gov.uk homepage", async function () {
  this.govukPage = new GovUKSearchPage(this.page);

  await this.govukPage.goto();
  await this.govukPage.rejectCookiesIfVisible();
});

When<CustomWorld>("the user searches gov.uk for {string}", async function (term: string) {
  await this.govukPage.search(term);
});

Then<CustomWorld>("the results should include {string}", async function (expectedText: string) {
  await this.govukPage.expectResultsToContain(expectedText);
});
