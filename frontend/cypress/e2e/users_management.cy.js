import { wait } from "@testing-library/user-event/dist/utils";

describe('Users Management Page', () => {

  before(() => {
    cy.visit('http://localhost:3000/Register');

    const email = 'user@gmail.com';
    const password = 'Test123!';

    cy.get('#form2').type(email);
    cy.get('#form3').type(password);
    cy.get('#registerbtn').click();
    cy.wait(1000)
  })

  beforeEach(() => {


    cy.visit('http://localhost:3000/login');
    const email = 'admin@gmail.com';
    const password = '123$Admin';

    cy.get('#formBasicEmail').type(email);
    cy.get('#formBasicPassword').type(password);
    cy.get('#loginButton').click();
    cy.wait(1000)
    cy.visit('http://localhost:3000/usersmanagement'); // Adjust the URL as per your application
  });

 it('loads the user management page and displays user rows', () => {
      cy.get('#userheader').should('exist');
      cy.get('#userheader').find('th').should('have.length', 5);
      cy.get('#userrow').find('td').should('exist');
    cy.contains('#userrow td', 'user@gmail.com').parents('tr').should("not.have.value", "user@gmail.com");

  });

  it('deletes a user row', () => {
    cy.contains('#userrow td', 'user@gmail.com').parents('tr').as('userRow');
    cy.get('@userRow').should('exist');
    cy.get('@userRow').find('button').contains('Delete').click();
    cy.contains('#userrow td', 'user@gmail.com').parents('tr').should("not.have.value", "user@gmail.com");
  });

});
