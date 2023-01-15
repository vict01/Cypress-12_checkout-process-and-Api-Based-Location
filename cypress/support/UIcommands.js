/// <reference types="cypress" />
import { BuyNordVPNButton, loginButton, getPlansById, paymentButton }
    from "../support/POM/mainPage"

Cypress.Commands.add('intercepApiRequest', (url, alias) => {
    cy.intercept(url).as(alias)
})

Cypress.Commands.add('assertApiRequest', (alias, expectedStatusCode) => {
    cy.wait(`@${alias}`, { log: false }).then(interception => {
        expect(interception.response.statusCode).eq(expectedStatusCode)
    })
})

Cypress.Commands.add('acceptCookiesDialogBox', () => {
    cy.get('.flex > .nord-button').click()
})

Cypress.Commands.add('assertCookiesSaved', () => {
    cy.getCookies()
        .should('have.length.least', 1)
        .then((cookies) => {
            expect(cookies[0]).to.exist
        })
})

Cypress.Commands.add('clickOnBuyNordVPNButton', () => {
    BuyNordVPNButton().click()
})

Cypress.Commands.add('clickOnLoginButton', () => {
    loginButton().click()
})

Cypress.Commands.add('assertUrlContains', (text) => {
    cy.url().should('include', text)
})

Cypress.Commands.add('goBack', () => {
    cy.go('back')
})

Cypress.Commands.add('selectPlansById', (planId="") => {
    getPlansById(planId).click()
})

Cypress.Commands.add('getPlansPriceById', (planId="") => {
     cy.get('[data-testid=MainPlanCard-atomic-price]').eq(planId)
})

Cypress.Commands.add('clickOnPaymentButton', () => {
    paymentButton().click()
})
