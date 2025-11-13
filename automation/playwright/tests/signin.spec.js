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

