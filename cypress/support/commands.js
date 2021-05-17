// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    // Get the authentication route
    cy.server();
    cy.route('POST', '/api/private/v1/authentications').as('authenticateLogin');

    // Go to the sign in page, sign in and wait for the authentication call to complete
    cy.visit('https://www.thinkific.com/signin/');
    cy.get('#email')
        .type(username); 
    cy.get('#password')
        .type(password);
    cy.get('button[type=submit]')
        .click();
    cy.wait('@authenticateLogin');
});

Cypress.Commands.add('goToInstructors', () => {
    // Navigate to the instructors section from the main menu
    cy.get('#menuToggle').click();
    cy.get('#accordion').contains('MANAGE LEARNING CONTENT')
        .click();
    cy.get('#collapseCourses a').contains('Instructors')
        .click();
});

Cypress.Commands.add('searchForInstructor', (instructor) => {
    // Search for the instructor
    cy.get('#q').type(instructor);
    cy.get('#btn-search').click();
});
