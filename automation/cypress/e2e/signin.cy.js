const { SignInPage } = require('../pages/signInPage');

describe('CozyCommerce Sign In', () => {
  const page = new SignInPage();

  it('signs in with email and password', function () {
    const runEmail = Cypress.env('RUN_EMAIL_LOGIN');
    const email = Cypress.env('USER_EMAIL');
    const password = Cypress.env('USER_PASSWORD');
    if (!runEmail || !email || !password) {
      this.skip();
      return;
    }
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
