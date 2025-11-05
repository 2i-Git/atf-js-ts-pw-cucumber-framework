import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

// eslint-disable-next-line @/no-restricted-exports
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["allure-playwright"]],
  grepInvert: /@ignore/, // always skip these by default
  use: {
    trace: process.env.CI ? "on-first-retry" : "on",
    headless: process.env.CI ? true : false,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
});
