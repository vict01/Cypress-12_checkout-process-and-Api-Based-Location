/// <reference types="Cypress" />
import { cleanString, roundNumber } from '../support/helper'

describe('Business Critical API Scenario', () => {

    it('API: Positive test | Verify data type and veracity of the fields', () => {
        cy.getLocalizationDataFromNordVPN()
            .then((resp) => {
                expect(resp.status).to.eq(200)

                let body = resp.body
                let ip = body.ip
                let country = body.country
                let country_code = body.country_code
                let isp = cleanString(body.isp)
                let asn = body.isp_asn
                let longitude = body.longitude
                let latitude = body.latitude

                expect(ip).to.be.a('string')
                expect(country).to.be.a('string')
                expect(country_code).to.be.a('string')
                expect(body.city).to.be.a('string')
                expect(isp).to.be.a('string')
                expect(body.state_code).to.be.a('string')
                expect(body.zip_code).to.be.a('string')
                expect(asn).to.be.a('number')
                expect(longitude).to.be.a('number')
                expect(latitude).to.be.a('number')
                expect(body.protected).to.be.a('boolean')

                longitude = longitude.toString()
                latitude = latitude.toString()

                cy.getLocalizationDataFromCloud().then(el => {
                    let el_isp = cleanString(el.org)
                    longitude = roundNumber(longitude)
                    el.longitude = roundNumber(el.longitude)
                    latitude = roundNumber(latitude)
                    el.latitude = roundNumber(el.latitude)

                    expect(ip).to.eq(el.ip)
                    expect(country).to.eq(el.country_name)
                    expect(country_code).to.eq(el.country)
                    expect(el_isp).to.contain(isp)
                    expect(el.asn).to.contain(asn)
                    expect(longitude).to.eq(el.longitude)
                    expect(latitude).to.eq(el.latitude)
                })
            })
    });

    it('API: Positive test | Verify data can be retrieved by passing valid parameters', () => {
        cy.getLocalizationDataFromNordVPN("country", "Germany")
            .then(listing => {
                let resp = Object.entries(listing)
                cy.task('log', ' ***** Keys and Values from Response ***** ')
                resp.map(([key, val] = entry) => {
                    cy.log(`The ${key} is ${val}`)
                    if (key == 'status') expect(val).to.eq(200)
                })

                let body = Object.keys(listing.body)
                cy.task('log', ' ***** Keys (fields) from body response ***** ')
                body.forEach(el => {
                    cy.log(el)
                })

                expect(body).to.have.length(11);
                expect(body[0]).to.equal("ip")
                expect(body[1]).to.equal("country")
                expect(body[2]).to.equal("country_code")
                expect(body[3]).to.equal("city")
                expect(body[4]).to.equal("isp")
                expect(body[5]).to.equal("isp_asn")
                expect(body[6]).to.equal("protected")
                expect(body[7]).to.equal("longitude")
                expect(body[8]).to.equal("latitude")
                expect(body[9]).to.equal("state_code")
                expect(body[10]).to.equal("zip_code")
            })
    });

    it('API: Negative test | Verify it is not possible get data with wrong parameter', () => {
        cy.getLocalizationDataFromNordVPN("country", "Fictitious_country")
            .then(listing => {
                let resp = Object.entries(listing)
                cy.task('log', ' ***** Keys and Values from Response ***** ')
                resp.map(([key, val] = entry) => {
                    cy.log(`The ${key} is ${val}`)
                    if (key == 'status') expect(val).to.not.eq(200)
                })

                let body = Object.keys(listing.body)
                cy.task('log', ' ***** Keys (fields) from body response ***** ')
                body.forEach(el => {
                    cy.log(el)
                })

                expect(body).to.not.have.length(11);
                expect(body[0]).to.not.equal("ip")
            })
    });

})