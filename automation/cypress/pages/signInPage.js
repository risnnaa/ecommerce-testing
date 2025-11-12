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

