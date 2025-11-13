import type { APIResponse } from "@playwright/test";
// Define a minimal interface for the World object used in Cucumber steps
export interface WorldLike {
  attach(data: string | Buffer, mediaType?: string): unknown;
}
// Utility class for logging API requests and responses
export class ApiLogger {
  static logRequest(
    world: WorldLike,
    method: string,
    url: string,
    payload?: unknown
  ): void {
    const requestInfo = {
      method: method.toUpperCase(),
      url,
      ...(payload ? { body: payload } : {}),
    };
    world.attach(JSON.stringify(requestInfo, null, 2), "application/json");
  }
  // Log the API response details and body
  static async logResponse(
    world: WorldLike,
    method: string,
    url: string,
    response: APIResponse
  ): Promise<void> {
    const meta = {
      request: { method: method.toUpperCase(), url },
      response: {
        status: response.status(),
        ok: response.ok(),
        finalUrl: response.url(),
      },
    };
    world.attach(JSON.stringify(meta, null, 2), "application/json");

    try {
      const bodyText = await response.text();
      const isJson = ApiLogger.isJson(bodyText);
      const prettyBody = isJson
        ? JSON.stringify(JSON.parse(bodyText), null, 2)
        : bodyText;

      world.attach(prettyBody, isJson ? "application/json" : "text/plain");
    } catch (error) {
      world.attach(
        `Error reading response body: ${(error as Error).message}`,
        "text/plain"
      );
    }
  }

  private static isJson(text: string): boolean {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  }
}
