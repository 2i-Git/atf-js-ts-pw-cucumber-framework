import { APIResponse } from "@playwright/test";
import { BaseAPI } from "./base";

export interface Country {
  name: {
    common: string;
  };
  region: string;
}

export class CountriesAPI extends BaseAPI {
  private readonly apiURL = "https://restcountries.com/v3.1";

  async getCountriesByRegion(region: string): Promise<string[]> {
    await this.init();
    const url = `${this.apiURL}/region/${region}`;
    const response: APIResponse = await this.get(url);

    if (!response.ok()) {
      console.error(await response.text());
      throw new Error(`Failed to fetch countries for region ${region}`);
    }

    const data = (await response.json()) as Country[];
    return data.map((c) => c.name.common);
  }
}
