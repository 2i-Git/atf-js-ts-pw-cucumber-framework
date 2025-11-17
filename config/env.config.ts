// config/env.config.ts
// defines different test environments and exports the current one based on TEST_ENV env variable
export type TestEnvironment = "local" | "dev" | "test" | "preprod";
// interface for environment configuration
interface EnvConfig {
    name: TestEnvironment;
    baseUrl: string;
    apiBaseUrl?: string;
}
// mapping of environment names to their configurations
const ENVIRONMENTS: Record<TestEnvironment, EnvConfig> = {
    // define configurations for each environment

    local: {
        name: "local",
        baseUrl: "http://localhost:3000",
        apiBaseUrl: "http://localhost:3001",
    },

    dev: {
        name: "dev",
        baseUrl: "https://dev.yourapp.com",
        apiBaseUrl: "https://dev-api.yourapp.com",
    },
    test: {
        name: "test",
        baseUrl: "https://test.yourapp.com",
        apiBaseUrl: "https://test-api.yourapp.com",
    },
    preprod: {
        name: "preprod",
        baseUrl: "https://preprod.yourapp.com",
        apiBaseUrl: "https://preprod-api.yourapp.com",
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
