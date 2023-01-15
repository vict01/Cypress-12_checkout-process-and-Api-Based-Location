const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer');


module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://nordcheckout.com/products', 
        setupNodeEvents(on, config) {
            allureWriter(on, config)
            on('task', {
                log (message) {
                  console.log(message)
                  return null
                }
            })
            return config;
        }
    }, 
    viewportWidth: 2600,
    viewportHeight: 1800,
    defaultCommandTimeout: 10000,
    pageLoadTimeout:60000,
    responseTimeout: 120e3,
    chromeWebSecurity: false,
    reporterOptions: {
        reportDir: 'cypress/reports/html',
        charts: true,
        reportPageTitle: 'My Test Suite',
        embeddedScreenShots: true,
        inLineAssets: true,
        video: true,
    }
});

