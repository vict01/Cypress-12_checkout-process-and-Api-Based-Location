/// <reference types="Cypress" />
import { appData } from "../fixtures/fixtures.json"
import { cleanNumber } from '../support/helper'
import { getTotalWithoutTaxes, getTaxAmount, getTotal } from '../support/POM/mainPage'

describe('Business Critical UI Scenario', () => {
    var aliasUrlPageLoaded = "pageLoaded"
    var aliasUrlProductsRequest = "products"

    before(() => {
        cy.visit('/', { log: false })
        cy.acceptCookiesDialogBox()
        cy.assertCookiesSaved()
    })

    it('UI Happy Path | Do a basic exploratory testing', () => {
        cy.intercepApiRequest(appData.urlProductsRequest, aliasUrlProductsRequest)
        cy.clickOnBuyNordVPNButton()
        cy.assertApiRequest(aliasUrlProductsRequest, 200)
        cy.clickOnLoginButton()
        cy.assertUrlContains('login')

        cy.intercepApiRequest(appData.urlPageElementsRequest, aliasUrlPageLoaded)
        cy.goBack()
        cy.assertApiRequest(aliasUrlPageLoaded, 200)

        cy.selectPlansById(1)
        cy.getPlansPriceById(1).then(el => {
            let basePrice = el.text()
            basePrice = cleanNumber(basePrice)
            cy.log(`The base price is: ${basePrice}`)
            cy.clickOnPaymentButton()

            getTotalWithoutTaxes().then(el => {
                let totalWithoutTaxes = el.text()
                totalWithoutTaxes = cleanNumber(totalWithoutTaxes) * 1
                cy.log(`Total without taxes: ${totalWithoutTaxes}`)
                expect(totalWithoutTaxes).to.eq(basePrice * 12)

                getTaxAmount().then(el => {
                    let taxes = el.text()
                    taxes = cleanNumber(taxes) * 1
                    cy.log(`Taxes: ${taxes}`)

                    getTotal().then(el => {
                        let total = el.text()
                        total = cleanNumber(total) * 1
                        cy.log(`Total: ${total}`)
                        expect(total).to.eq(totalWithoutTaxes + taxes)
                    })
                })
            })
        })

    });
})