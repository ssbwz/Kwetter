
describe('Login Functionality', () => {
  it('successfully logs in with valid credentials', () => {

    cy.visit('http://localhost:3000/Register');
    cy.wait(1000)

    const email = 'user001@gmail.com';
    const password = '123$User';
    const birthdate = '2001-06-07';

    cy.get('#form2').type(email);
    cy.get('#form3').type(password);
    cy.get('#form4').type(birthdate);
    cy.get('#termsAndConditions').click();
    cy.get('#registerbtn').click();

    cy.url().should('equal', 'http://localhost:3000/login');

    cy.visit('http://localhost:3000/login');
    cy.get('#formBasicEmail').type(email);
    cy.get('#formBasicPassword').type(password);
    cy.get('#loginButton').click();
    cy.wait(1000)
    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('displays error message for invalid credentials', () => {
    cy.visit('http://localhost:3000/login');
    cy.wait(1000)

    cy.get('#formBasicEmail').type('invalid@example.com');
    cy.get('#formBasicPassword').type('invalidpassword');
    cy.get('#loginButton').click();
    cy.wait(1000)
    cy.contains('Please check your credentials').should('be.visible');
  });

});