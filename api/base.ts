import { request, APIRequestContext, APIResponse } from "@playwright/test";

export class BaseAPI {
  protected apiContext!: APIRequestContext;
  protected readonly baseURL = "https://restcountries.com/v3.1/";

  async init() {
    this.apiContext = await request.newContext({ baseURL: this.baseURL });
  }

  async get(endpoint: string): Promise<APIResponse> {
    return this.apiContext.get(endpoint);
  }
}
