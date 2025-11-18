// config/env.config.ts

export type TestEnvironment = "local" | "dev" | "test" | "preprod";

export interface ServiceEndpoints {
    wikiBaseUrl: string;
    googleBaseUrl: string;
    defraHost: string;
    defraBaseUrl: string;
    petStoreBaseUrl: string;
}

export interface EnvConfig {
    name: TestEnvironment;
    services: ServiceEndpoints;
}

/**
 * Per-environment hostnames for each application.
 *
 * For Wiki/Google these are the same in every env (public services).
 * For DEFRA we model the pattern explicitly so we can change just the
 * environment part later.
 */

// Wikipedia – same everywhere
const WIKI_HOST = "https://www.wikipedia.org";

// Google – same everywhere
const GOOGLE_HOST = "https://www.google.com";

// PetStore Swagger API – same everywhere (public demo API)
const PETSTORE_HOST = "https://petstore.swagger.io/v2";

// DEFRA per environment – for now all the same,
// but THIS is where you'll change the "mid URL" later.
const DEFRA_HOSTS: Record<TestEnvironment, string> = {
    local: "https://uk-air.defra.gov.uk",
    dev: "https://uk-air.defra.gov.uk",
    test: "https://uk-air.defra.gov.uk",
    preprod: "https://uk-air.defra.gov.uk",

};

/**
 * Build the full service endpoints for a given environment.
 * Think of this as turning:
 *   https://envVar/.../component/feature
 * into a real URL for the chosen env.
 */
function createServiceEndpoints(env: TestEnvironment): ServiceEndpoints {
    const defraHost = DEFRA_HOSTS[env];

    return {
        wikiBaseUrl: WIKI_HOST,
        googleBaseUrl: GOOGLE_HOST,
        defraHost: defraHost,
        defraBaseUrl:
            `${defraHost}/data/sos/service?service=SOS&request=GetCapabilities`,
        petStoreBaseUrl: PETSTORE_HOST,
    };
}

// All environments, using the same pattern, just with different host maps if needed
export const ENVIRONMENTS: Record<TestEnvironment, EnvConfig> = {
    local: {
        name: "local",
        services: createServiceEndpoints("local"),
    },
    dev: {
        name: "dev",
        services: createServiceEndpoints("dev"),
    },
    test: {
        name: "test",
        services: createServiceEndpoints("test"),
    },
    preprod: {
        name: "preprod",
        services: createServiceEndpoints("preprod"),
    },
};

function getEnvironmentName(): TestEnvironment {
    const raw = (process.env.TEST_ENV || "local").toLowerCase();

    if (raw === "local" || raw === "dev" || raw === "test" || raw === "preprod") {
        return raw;
    }

    console.warn(
        `Unknown TEST_ENV "${raw}", falling back to "local". Valid values: local, dev, test, preprod`,
    );
    return "local";
}

export const currentEnv: EnvConfig = ENVIRONMENTS[getEnvironmentName()];
