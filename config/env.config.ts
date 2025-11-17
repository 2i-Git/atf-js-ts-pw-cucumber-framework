// config/env.config.ts
// defines different test environments and exports the current one based on TEST_ENV env variable
export type TestEnvironment = "local" | "dev" | "test" | "preprod";

// interface for service endpoints used in tests
interface ServiceEndpoints {
  wikiBaseUrl: string;
  googleBaseUrl: string;
  defraBaseUrl: string;
}
// interface for complete environment configuration
interface EnvConfig {
  name: TestEnvironment;
  baseUrl: string;
  apiBaseUrl?: string;
  services: ServiceEndpoints;
}
// default service endpoints used across environments
const DEFAULT_SERVICES: ServiceEndpoints = {
  wikiBaseUrl: "https://www.wikipedia.org",
  googleBaseUrl: "https://www.google.com",
  defraBaseUrl: "https://uk-air.defra.gov.uk/data/sos/service?service=SOS&request=GetCapabilities",
};

// mapping of environment names to their configurations
const ENVIRONMENTS: Record<TestEnvironment, EnvConfig> = {
  // define configurations for each environment

  local: {
    name: "local",
    baseUrl: "http://localhost:3000",
    apiBaseUrl: "http://localhost:3001",
    services: DEFAULT_SERVICES,
  },

  dev: {
    name: "dev",
    baseUrl: "https://dev.yourapp.com",
    apiBaseUrl: "https://dev-api.yourapp.com",
    services: DEFAULT_SERVICES,
  },
  test: {
    name: "test",
    baseUrl: "https://test.yourapp.com",
    apiBaseUrl: "https://test-api.yourapp.com",
    services: DEFAULT_SERVICES,
  },
  preprod: {
    name: "preprod",
    baseUrl: "https://preprod.yourapp.com",
    apiBaseUrl: "https://preprod-api.yourapp.com",
    services: DEFAULT_SERVICES,
  },
};

function getEnvironmentName(): TestEnvironment {
  const envVar = (process.env.TEST_ENV || "local").toLowerCase();

  if (["local", "dev", "test", "preprod"].includes(envVar)) {
    return envVar as TestEnvironment;
  }

  console.warn(
    `Unknown TEST_ENV "${envVar}", falling back to "local". ` +
      `Valid values: local, dev, test, preprod`
  );
  return "local";
}

export const currentEnv = ENVIRONMENTS[getEnvironmentName()];
