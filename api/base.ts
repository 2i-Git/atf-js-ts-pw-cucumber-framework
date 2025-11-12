import { request, APIRequestContext, APIResponse } from "@playwright/test";

export class BaseAPI {
  protected apiContext!: APIRequestContext;

  async init() {
    this.apiContext = await request.newContext();
  }

  async get(url: string): Promise<APIResponse> {
    return this.apiContext.get(url);
  }

  async post(url: string, data: object): Promise<APIResponse> {
    return this.apiContext.post(url, { data });
  }
}
