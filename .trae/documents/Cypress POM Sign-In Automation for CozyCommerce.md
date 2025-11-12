## Overview
- Add Cypress E2E tests using Page Object Model targeting `https://demo.cozycommerce.dev/signin`.
- Use plain JavaScript throughout (no TypeScript).
- Implement three flows:
  1. Sign in with email/password
  2. Quick User Login button
  3. Quick Admin Login button

## Folder Structure
- `cypress.config.js` (repo root)
- `automation/cypress/pages/signInPage.js`
- `automation/cypress/e2e/signin.cy.js`
- `automation/cypress/support/e2e.js`
- Artifacts: `screenshots/`, `test-results/videos/`

## Setup Steps
- Initialize Node tooling at repo root: `npm init -y`
- Install Cypress: `npm i -D cypress`
- Create `cypress.config.js` pointing to `automation/cypress` and setting baseUrl.
- Add `package.json` scripts to run tests.

## Config
```js
// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demo.cozycommerce.dev',
    specPattern: 'automation/cypress/e2e/**/*.cy.{js}',
    supportFile: 'automation/cypress/support/e2e.js',
    fixturesFolder: 'automation/cypress/fixtures',
    screenshotsFolder: 'screenshots',
    videosFolder: 'test-results/videos'
  },
  video: false
});
```

## Page Object
```js
// automation/cypress/pages/signInPage.js
class SignInPage {
  visit() { cy.visit('/signin'); }
  email() { return cy.get('input[type="email"]'); }
  password() { return cy.get('input[type="password"]'); }
  submit() { return cy.get('button[type="submit"]'); }
  quickUser() { return cy.contains('button', 'Quick User Login'); }
  quickAdmin() { return cy.contains('button', 'Quick Admin'); }
  assertSignedIn() { cy.url().should('not.include', '/signin'); }
}

module.exports = { SignInPage };
```

## Tests
```js
// automation/cypress/e2e/signin.cy.js
const { SignInPage } = require('../pages/signInPage');

describe('CozyCommerce Sign In', () => {
  const page = new SignInPage();

  it('signs in with email and password', () => {
    const email = Cypress.env('USER_EMAIL') || 'user@example.com';
    const password = Cypress.env('USER_PASSWORD') || 'password123';
    page.visit();
    page.email().type(email);
    page.password().type(password, { log: false });
    page.submit().click();
    page.assertSignedIn();
  });

  it('signs in via Quick User Login', () => {
    page.visit();
    page.quickUser().click();
    page.assertSignedIn();
  });

  it('signs in via Quick Admin Login', () => {
    page.visit();
    page.quickAdmin().click();
    page.assertSignedIn();
  });
});
```

## Support File
```js
// automation/cypress/support/e2e.js
```

## Scripts
```json
// package.json (scripts)
{
  "scripts": {
    "cy:open": "cypress open --config-file cypress.config.js",
    "cy:run": "cypress run --config-file cypress.config.js",
    "cy:run:headed": "cypress run --headed --browser chrome --config-file cypress.config.js"
  }
}
```

## Running
- Headed: `npm run cy:open`
- Headless: `npm run cy:run`
- Provide credentials via env: `npm run cy:run -- --env USER_EMAIL=you@example.com,USER_PASSWORD=secret`

## Selectors & Reliability
- Email: `input[type="email"]`
- Password: `input[type="password"]`
- Submit: `button[type="submit"]`
- Quick User: `cy.contains('button', 'Quick User Login')`
- Quick Admin: `cy.contains('button', 'Quick Admin')`
- If button labels differ slightly, adjust `contains` text accordingly.

## Verification
- Assert leaving `/signin` upon success via `cy.url().should('not.include', '/signin')`.
- Optionally add an additional assertion for a post-login UI element if available.

## Notes
- The CozyCommerce Sign In page includes Email and Password inputs with a Sign In action; quick login buttons may exist for user/admin roles. The plan uses robust selectors that should match typical implementations.
- Credentials should not be committed; prefer runtime env variables as shown.
