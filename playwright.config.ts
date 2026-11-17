import { defineConfig } from '@playwright/test';

// Reporters shared by local and CI runs.
// screenshotExcelReporter writes one Excel evidence file per test case under
// a timestamped run folder in test-artifacts/screenshot-reports/.
const reporters = [
  ['list'],
] as const;

// Specs that have their own project below, so the generic 'account' project skips them
// (otherwise they would run twice).
const DEDICATED_SPECS = [
  '**/account/test_credit_review_buttons.spec.ts',
  '**/one_click_sch2.spec.ts',
  '**/account/one_click_sch3.spec.ts',
];

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',

  reporter: process.env.CI
    ? [['html', { open: 'never' }], ...reporters]
    : [['html', { open: 'always' }], ...reporters],

  use: {
    browserName: 'chromium',
    channel: 'chrome',
    headless: false,
    trace: 'off',
    // Capture and attach a screenshot for every scenario for the Excel report.
    screenshot: 'only-on-failure',
    video: 'off',
  },

  projects: [
    
    {
      name: 'account',
      testMatch: '**/account/*.spec.ts',
      testIgnore: DEDICATED_SPECS,
    },
  ],
});