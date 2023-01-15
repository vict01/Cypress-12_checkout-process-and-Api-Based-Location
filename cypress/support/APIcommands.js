import { appData } from "../fixtures/fixtures.json"

const urlApi = appData.urlApi

Cypress.Commands.add('getLocalizationDataFromNordVPN', (parameter = "", value = "") => {
    cy.request({
        url: `${urlApi}?${parameter}=${value}`,
        headers: {
            contentType: appData.contentTypeAppJSON
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('getDataFromRequest', (url) => {
    cy.request({
        url: url,
        headers: {
            contentType: appData.contentTypeAppJSON
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('getLocalizationDataFromCloud', () => {
    return Cypress.$.getJSON('https://ipapi.co/json/', function (data) {
        return data
    })
})
