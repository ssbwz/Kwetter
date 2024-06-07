/// <reference types="cypress" />

describe('Register User', () => {
  it('successfully registers a new user', () => {
    cy.intercept('POST', '/register', {
      statusCode: 200,
    }).as('registerRequest');

    cy.visit('http://localhost:3000/Register');

    const email = 'user-tsest@example.com';
    const password = 'Test123!';
    const birthdate = '2001-06-07';

    cy.get('#form2').type(email);
    cy.get('#form3').type(password);
    cy.get('#form4').type(birthdate);
    cy.get('#termsAndConditions').click();
    cy.get('#registerbtn').click();
    cy.wait(1000)
    cy.url().should('include', 'http://localhost:3000/login');
  });

  it('displays error message for already registered email', () => {
    cy.intercept('POST', 'http://localhost:3000/register', {
      statusCode: 400,
    }).as('registerRequest');

    cy.visit('http://localhost:3000/Register');

    const email = 'user-tsest@example.com';
    const password = 'Test123!';
    const birthdate = '2001-06-07';
    
    cy.get('#form2').type(email);
    cy.get('#form3').type(password);
    cy.get('#form4').type(birthdate);
    cy.get('#termsAndConditions').click();
    cy.get('#registerbtn').click();
    cy.wait(1000)

    cy.contains('This email is already been used').should('be.visible');
  });

});
