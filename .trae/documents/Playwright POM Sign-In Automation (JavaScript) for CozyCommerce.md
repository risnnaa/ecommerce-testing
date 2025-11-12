## Overview
- Implement Playwright E2E tests in JavaScript using Page Object Model for `https://demo.cozycommerce.dev/signin`.
- Place all Playwright assets under `automation/playwright` to match your repo conventions.
- Cover flows:
  1. Email + password sign-in
  2. Quick User Login button
  3. Quick Admin Login button

## Folder Structure
- `automation/playwright/playwright.config.js`
- `automation/playwright/pages/SignInPage.js`
- `automation/playwright/tests/signin.spec.js`
- `automation/playwright/test-results/` (HTML report, screenshots, videos)

## Setup Steps
- Add Playwright as a dev dependency and install browsers.
- Add npm scripts:
  - `pw:install`: install browsers
  - `pw:open`: run UI mode with config path
  - `pw:run`: run headless with config path

## Config
```js
// automation/playwright/playwright.config.js
module.exports = {
  testDir: 'automation/playwright/tests',
  use: {
    baseURL: 'https://demo.cozycommerce.dev',
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'automation/playwright/test-results/html' }]
  ]
};
```

## Page Object
```js
// automation/playwright/pages/SignInPage.js
class SignInPage {
  constructor(page) { this.page = page; }
  async visit() { await this.page.goto('/signin'); }
  email() { return this.page.locator('input[type="email"]'); }
  password() { return this.page.locator('input[type="password"]'); }
  submit() { return this.page.getByRole('button', { name: /sign in/i }); }
  quickUser() { return this.page.getByRole('button', { name: /quick user login/i }); }
  quickAdmin() { return this.page.getByRole('button', { name: /quick admin/i }); }
  async assertSignedIn() { const url = this.page.url(); expect(url).not.toContain('/signin'); }
}

module.exports = { SignInPage };
```

## Tests
```js
// automation/playwright/tests/signin.spec.js
const { test, expect } = require('@playwright/test');
const { SignInPage } = require('../pages/SignInPage');

test.describe('CozyCommerce Sign In', () => {
  test('signs in with email and password', async ({ page }) => {
    const runEmail = process.env.RUN_EMAIL_LOGIN;
    const email = process.env.USER_EMAIL;
    const password = process.env.USER_PASSWORD;
    if (!runEmail || !email || !password) test.skip();
    const signin = new SignInPage(page);
    await signin.visit();
    await signin.email().fill(email);
    await signin.password().fill(password);
    await signin.submit().click();
    await signin.assertSignedIn();
  });

  test('signs in via Quick User Login', async ({ page }) => {
    const signin = new SignInPage(page);
    await signin.visit();
    await signin.quickUser().click();
    await signin.assertSignedIn();
  });

  test('signs in via Quick Admin Login', async ({ page }) => {
    const signin = new SignInPage(page);
    await signin.visit();
    await signin.quickAdmin().click();
    await signin.assertSignedIn();
  });
});
```

## Scripts
```json
// package.json (add)
{
  "scripts": {
    "pw:install": "npx playwright install --with-deps",
    "pw:open": "playwright test --ui -c automation/playwright/playwright.config.js",
    "pw:run": "playwright test -c automation/playwright/playwright.config.js"
  }
}
```

## Running
- Install browsers: `npm run pw:install`
- UI mode: `npm run pw:open`
- Headless: `npm run pw:run`
- Provide credentials to run email/password test:
  - `RUN_EMAIL_LOGIN=true USER_EMAIL=you@example.com USER_PASSWORD=secret npm run pw:run`

## Selectors & Reliability
- Inputs: `input[type="email"]`, `input[type="password"]` and a `Sign In` role-based button.
- Quick actions: Role-based buttons with names `Quick User Login` and `Quick Admin`.
- If button text differs slightly, adjust the regex names accordingly.

## Verification
- Assert leaving `/signin` after success via URL check.
- Optionally enhance with post-login UI element assertion if needed.

## Notes
- The CozyCommerce Sign In page features Email and Password inputs, a Sign In action, and account-related links; quick login buttons are exercised via role-based selectors.
- Env vars prevent committing credentials and allow opt-in for the email/password test.