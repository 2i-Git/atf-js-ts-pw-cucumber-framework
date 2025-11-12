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
    const response: APIResponse = await this.get(`region/${region}`);

    if (!response.ok()) {
      console.log(response);
      throw new Error(`Failed to fetch countries for region ${region}`);
    }

    const data = (await response.json()) as Country[];
    // return only country names
    return data.map((c) => c.name.common);
  }
}
