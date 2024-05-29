describe('share a tweet', () => {

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
    const email = 'user@gmail.com';
    const password = 'Test123!';
    cy.get('#formBasicEmail').type(email);
    cy.get('#formBasicPassword').type(password);
    cy.get('#loginButton').click();
    cy.wait(1000)
  });


  it('shares a tweet', () => {
    const tweetText = 'Test tweet';
    cy.get('#tweetform').type(tweetText);
    cy.contains('Share').click();
    cy.contains('Tweet shared.').should('be.visible');
    cy.wait(1000);
    cy.contains('Tweet shared.').should('not.exist');
});

it('shows validation message when tweet text is empty', () => {
    cy.contains('Share').click();
    cy.contains('Please fill the fields.').should('be.visible');
});
})