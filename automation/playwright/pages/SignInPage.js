const { expect } = require('@playwright/test');

class SignInPage {
  constructor(page) { this.page = page; }
  async visit() { await this.page.goto('/signin'); }
  email() { return this.page.locator('input[type="email"]'); }
  password() { return this.page.locator('input[type="password"]'); }
  submit() { return this.page.getByRole('button', { name: /sign in/i }); }
  quickUser() { return this.page.getByText(/quick user login/i); }
  quickAdmin() { return this.page.getByText(/quick admin(\s*login)?/i); }
  async assertSignedIn() { await this.page.waitForLoadState('networkidle'); const url = this.page.url(); expect(url).not.toContain('/signin'); }
}

module.exports = { SignInPage };
