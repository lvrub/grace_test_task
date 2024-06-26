import { defineConfig, devices } from "playwright/test"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'],
    ['html', { open: 'never' }] ,
    ['junit', {outputFile: 'test-result.xml'}]
  ],  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 800 * 100,
  expect:{
    timeout : 15000,
    toHaveScreenshot: {
      // An acceptable amount of pixels that could be different, unset by default.
      // maxDiffPixelRatio: 1,
      scale :"device"
    },
  },
  // globalSetup  : require.resolve("/./path to global-setup")
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    headless: false,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
      ...devices['Desktop Chrome'],
      viewport: { width: 1024, height: 768 },
       },
    },
  ],
});
