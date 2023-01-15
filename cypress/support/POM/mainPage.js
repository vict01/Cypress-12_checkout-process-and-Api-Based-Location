
export function BuyNordVPNButton() {
    return cy.get('[data-testid=ProductGroupButton-merchant]').contains('NordVPN')
}

export function loginButton() {
    return cy.get('[data-testid="UserProfile-login-button"]')    
}

export function getPlansById(planId="") {   
    return cy.get('[data-testid="MainPlanCard"] > [data-testid="MainPlanCard-button"]').eq(planId)
}

export function paymentButton() {   
    return cy.get('[data-testid="PaymentButton"]')
}

export function getTotalWithoutTaxes() {   
    return cy.get('[data-testid="SelectedCartSummaryCard-total-price"]')
}

export function getTaxAmount() {   
    return cy.get('[data-testid="TaxSelector-amount"]')
}

export function getTotal() {   
    return cy.get('[data-testid="CartSummary-total-amount"]')
}
