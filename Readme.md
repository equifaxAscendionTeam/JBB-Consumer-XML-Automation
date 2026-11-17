# Playwright Salesforce Tests

Open the project in VS Code, run `npm install`, install the Playwright browsers with
`npx playwright install`, then run the tests with `npm test`.

## Reusable screenshot capture

Use the shared helper in `utils/captureScreenshot.ts` in regression tests to capture
and attach screenshots to the Playwright report:

```ts
import { captureScreenshot } from '../../utils/captureScreenshot';

await captureScreenshot(page, testInfo, 'scenario-step-name');
```

Adjust the relative import path for the test file location. Set `SCREENSHOTS=off`
to disable captures, or `FULL_PAGE_SCREENSHOTS=true` to capture the full page.

The configured `utils/screenshotExcelReporter.ts` automatically creates Excel
evidence for each test that has PNG screenshot attachments. Excel generation is
kept separate in `utils/createScreenshotExcelReport.ts`; no test-specific
`afterEach` hook is required. Reports are organized under
`test-artifacts/screenshot-reports/RUN_YYYYMMDD_HHMMSS/TC-001/`, with one
`TC-001_evidence.xlsx` workbook per test case; no manifest file is generated.
Test-case numbers are assigned in stable file and source-line order. If two runs
start in the same second, a numeric suffix is added to the later run folder.
Each worksheet has Screenshot, Test, Status, and Image columns, with each PNG
embedded in its row; generated attachment hashes are omitted from the Screenshot
column. The reporter does not create a workbook for tests without PNG
attachments. The shared helper also saves screenshot copies under
`test-artifacts/screenshots` with the capture time, test id, and retry number in
each filename. These locations are outside Playwright's managed `test-results`
directory, so earlier captures are retained across runs. This works for future
tests too, provided screenshots are attached as PNG files or captured using the
shared helper.