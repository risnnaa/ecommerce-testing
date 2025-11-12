module.exports = {
  testDir: './tests',
  use: {
    baseURL: 'https://demo.cozycommerce.dev',
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: './test-results/html' }]
  ]
};
