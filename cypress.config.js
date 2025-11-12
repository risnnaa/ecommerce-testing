const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demo.cozycommerce.dev',
    specPattern: 'automation/cypress/e2e/**/*.cy.js',
    supportFile: 'automation/cypress/support/e2e.js',
    fixturesFolder: 'automation/cypress/fixtures',
    screenshotsFolder: 'screenshots',
    videosFolder: 'test-results/videos'
  },
  video: false
});
