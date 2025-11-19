export type TestEnvironment = "local" | "dev" | "test" | "preprod";

export interface UiEndpoints {
  govAppUIBaseUrl: string;
}

export interface ServiceEndpoints {
  petStoreBaseUrl: string;
  govAppAPIBaseUrl: string;
  ui: UiEndpoints;
}

export interface EnvConfig {
  name: TestEnvironment;
  services: ServiceEndpoints;
}

// PetStore Swagger API – same everywhere (public demo API)
const PETSTORE_HOST = "https://petstore.swagger.io/v2";
const GOVAPP_HOST = "http://localhost:3000";
const GOVAPPAPI_HOST = "http://localhost:3000/api";

/**
 * Build the full service endpoints for a given environment.
 * Think of this as turning:
 *   https://envVar/.../component/feature
 * into a real URL for the chosen env.
 */

// createServiceEndpoints(env: TestEnvironment ) if you got different envs in the same api
function createServiceEndpoints(): ServiceEndpoints {
  return {
    petStoreBaseUrl: PETSTORE_HOST,
    govAppAPIBaseUrl: GOVAPPAPI_HOST,
    ui: {
      govAppUIBaseUrl: GOVAPP_HOST,
    },
  };
}

// All environments, using the same pattern, just with different host maps if needed
export const ENVIRONMENTS: Record<TestEnvironment, EnvConfig> = {
  local: {
    name: "local",
    //services: createServiceEndpoints("local"), // if you got different envs in the same api

    services: createServiceEndpoints(),
  },
  dev: {
    name: "dev",
    //services: createServiceEndpoints("dev"),
    services: createServiceEndpoints(),
  },
  test: {
    name: "test",
    //services: createServiceEndpoints("test"),
    services: createServiceEndpoints(),
  },
  preprod: {
    name: "preprod",
    //services: createServiceEndpoints("preprod"),
    services: createServiceEndpoints(),
  },
};

function getEnvironmentName(): TestEnvironment {
  const raw = (process.env.TEST_ENV || "local").toLowerCase();

  if (raw === "local" || raw === "dev" || raw === "test" || raw === "preprod") {
    return raw;
  }

  console.warn(
    `Unknown TEST_ENV "${raw}", falling back to "local". Valid values: local, dev, test, preprod`
  );
  return "local";
}

export const currentEnv: EnvConfig = ENVIRONMENTS[getEnvironmentName()];