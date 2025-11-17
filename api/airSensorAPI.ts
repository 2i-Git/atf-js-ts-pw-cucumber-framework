import { APIResponse } from "@playwright/test";
import { BaseAPI } from "./base";
import { WorldLike } from "../support/apiLogger";

export class AirSensorAPI extends BaseAPI {
  endpoint: string;

  constructor(world: WorldLike, endpoint?: string) {
    super(world); // Pass the world object to BaseAPI
    this.endpoint =
      endpoint ||
      "https://uk-air.defra.gov.uk/data/sos/service?service=SOS&request=GetCapabilities";
  }

  async getCapabilities(): Promise<APIResponse> {
    await this.init();
    return await this.get(this.endpoint);
  }

  async hasCapabilitiesTag(response: APIResponse): Promise<boolean> {
    const text = await response.text();
    return text.includes("<sos:Capabilities");
  }
}
