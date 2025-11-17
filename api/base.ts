import { request, APIRequestContext, APIResponse } from "@playwright/test";
import { ApiLogger, WorldLike } from "../support/apiLogger";
export class BaseAPI {
  protected apiContext!: APIRequestContext;
  protected world: WorldLike;
  constructor(world: WorldLike) {
    this.world = world;
  }
  async init() {
    this.apiContext = await request.newContext();
  }

  async get(url: string): Promise<APIResponse> {
    ApiLogger.logRequest(this.world, "GET", url);
    const response = await this.apiContext.get(url);
    await ApiLogger.logResponse(this.world, "GET", url, response);
    return response;
  }

  async post(url: string, data: object): Promise<APIResponse> {
    return this.apiContext.post(url, { data });
  }

  async put(url: string, data: object): Promise<APIResponse> {
    return this.apiContext.put(url, { data });
  }

  async delete(url: string): Promise<APIResponse> {
    return this.apiContext.delete(url);
  }
}
