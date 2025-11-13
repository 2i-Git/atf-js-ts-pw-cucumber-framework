import { APIResponse } from "@playwright/test";
import { BaseAPI } from "./base";

export class AirSensorAPI extends BaseAPI {
  private readonly endpoint =
    "https://uk-air.defra.gov.uk/data/sos/service?service=SOS&request=GetCapabilities";

  // send request and check response
  async getCapabilities(): Promise<APIResponse> {
    await this.init();
    const response = await this.get(this.endpoint);

    if (!response.ok()) {
      console.error(await response.text());
      throw new Error(`Failed to fetch capabilities: ${response.status()}`);
    }

    return response;
  }
}
