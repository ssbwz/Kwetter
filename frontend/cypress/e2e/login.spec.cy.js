
describe('Login Functionality', () => {
  it('successfully logs in with valid credentials', () => {

    cy.visit('http://localhost:3000/Register');

    const email = 'user@gmail.com';
    const password = '123$User';

    cy.get('#form2').type(email);
    cy.get('#form3').type(password);
    cy.get('#registerbtn').click();

    cy.url().should('equal', 'http://localhost:3000/login');

    cy.visit('http://localhost:3000/login');
    cy.get('#formBasicEmail').type('user@gmail.com');
    cy.get('#formBasicPassword').type('123$User');
    cy.get('#loginButton').click();
    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('displays error message for invalid credentials', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#formBasicEmail').type('invalid@example.com');
    cy.get('#formBasicPassword').type('invalidpassword');
    cy.get('#loginButton').click();
    cy.contains('Please check your credentials').should('be.visible');
  });

});