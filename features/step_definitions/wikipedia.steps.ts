import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { WikipediaPage } from "../../pages/wikipedia.page";
import { CustomWorld } from "../../support/world";

Given("I am on the Wikipedia home page", async function (this: CustomWorld) {
  const wiki = new WikipediaPage(this.page);
  await wiki.gotoHome();
});

When("I search for {string}", async function (this: CustomWorld, topic: string) {
  const wiki = new WikipediaPage(this.page);
  await wiki.searchAndOpen(topic);
  const title = await wiki.getArticleTitle();
  if (!title || title.length === 0) {
    throw new Error("Article title should be present");
  }
});

Then("the article should contain:", async function (this: CustomWorld, table: DataTable) {
  const wiki = new WikipediaPage(this.page);
  const articleText = await wiki.getArticleText();

  const words = table.raw().map((r) => r[0]);
  for (const word of words) {
    const w = word.toLowerCase();
    if (!articleText.includes(w)) {
      throw new Error(`Article is missing word: ${w}`);
    }
  }
});
