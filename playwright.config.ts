import { defineConfig, devices } from '@playwright/test';
import { Status } from 'allure-js-commons';
import * as os from 'node:os';
import path from 'path';

// Read from different env files based on the environment
const environment = process.env.ENV || 'dev';
require('dotenv').config({
  path: path.resolve(__dirname, `.env.${environment}`)
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // Use both HTML and Allure reporters
  reporter: [
    ['html'],
    ['allure-playwright', {
      detail: true,
      suiteTitle: true,
      outputFolder: 'allure-results',
      categories: [
        {
          name: 'Retried tests',
          messageRegex: '.*',
          matchedStatuses: [Status.BROKEN]
        },
        {
          name: 'Failed tests',
          messageRegex: '.*',
          matchedStatuses: [Status.FAILED]
        }
      ],
      environmentInfo: {
        os_platform: os.platform(),
        os_release: os.release(),
        os_version: os.version(),
        node_version: process.version,
        environment: environment
      }
    }]
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Additional helpful options
    actionTimeout: 15000,
    navigationTimeout: 30000,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    
    // Collect more test details
    testIdAttribute: 'data-testid'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ],

  // Global setup to run before all tests
  globalSetup: require.resolve('./global-setup.ts'),
  
  // Output folder for test artifacts
  outputDir: 'test-results'
});
