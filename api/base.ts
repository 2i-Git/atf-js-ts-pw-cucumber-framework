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
    ApiLogger.logRequest(this.world, "POST", url, data);
    const response = await this.apiContext.post(url, { data });
    await ApiLogger.logResponse(this.world, "POST", url, response);
    return response;
  }

  async put(url: string, data: object): Promise<APIResponse> {
    ApiLogger.logRequest(this.world, "PUT", url, data);
    const response = await this.apiContext.put(url, { data });
    await ApiLogger.logResponse(this.world, "PUT", url, response);
    return response;
  }

  async delete(url: string): Promise<APIResponse> {
    ApiLogger.logRequest(this.world, "DELETE", url);
    const response = await this.apiContext.delete(url);
    await ApiLogger.logResponse(this.world, "DELETE", url, response);
    return response;
  }
}
