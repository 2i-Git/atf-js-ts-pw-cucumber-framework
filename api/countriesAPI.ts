import { APIResponse } from "@playwright/test";
import { BaseAPI } from "./base";

export interface Country {
  name: {
    common: string;
  };
  region: string;
}

export class CountriesAPI extends BaseAPI {
  async getCountriesByRegion(region: string): Promise<string[]> {
    await this.init();
    const url = `https://restcountries.com/v3.1/region/${region}`;
    const response: APIResponse = await this.get(url);

    if (!response.ok()) {
      throw new Error(`Failed to fetch countries for region ${region}`);
    }

    const data = (await response.json()) as Country[];
    // return only country names
    return data.map((c) => c.name.common);
  }
}
