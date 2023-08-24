import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1600,
  viewportHeight: 760,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  
  e2e: {
    experimentalModifyObstructiveThirdPartyCode: true,
    experimentalOriginDependencies: true,
    baseUrl: 'https://trello.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
