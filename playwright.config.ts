import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/website",
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:43917", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
  ],
  webServer: {
    command: "bunx serve website/out -l 43917 --no-clipboard",
    url: "http://127.0.0.1:43917",
    reuseExistingServer: !process.env.CI,
  },
});
