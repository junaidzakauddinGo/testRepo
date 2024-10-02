describe('Validate Form', () => {
  it('Validate Empty Form Errors', () => {
    cy.visit('https://demoqa.com/automation-practice-form/')
    cy.get('#submit').click()
    cy.get('#firstName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#lastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.get('#userNumber').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  })
})