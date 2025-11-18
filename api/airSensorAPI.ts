import { APIResponse } from "@playwright/test";
import { BaseAPI } from "./base";
import { WorldLike } from "../support/apiLogger";
import { currentEnv } from "../config/env.config";

// Extract just the base URL (without the path and query params)
const baseHost = currentEnv.services.defraHost;
const url = `${baseHost}/data/sos/service?service=SOS&request=GetCapabilities`;
export class AirSensorAPI extends BaseAPI {
  endpoint: string;

  constructor(world: WorldLike, endpoint?: string) {
    super(world); // Pass the world object to BaseAPI
    this.endpoint =
      endpoint ||
      url;
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
