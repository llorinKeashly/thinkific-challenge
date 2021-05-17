describe('Search functionality', function() {
  beforeEach(() => {
    const username = 'llorinkeashly@gmail.com';
    const password = 'password123';

    cy.login(username, password);
    cy.goToInstructors();
  });

  it('searches by last name and generates csv', function() {
    const instructorName = 'Richardson';

    // Search for the instructor using their last name
    cy.searchForInstructor(instructorName);

    // Export the csv
    cy.get('.button').contains('EXPORT (CSV)').click();

    // Assert the instructor is present in the search results
    cy.get('.table-container__content td')
        .should('contain', instructorName);

   // Assert csv confirmation toast shows up
    cy.get('.Toast_toast__message__156')
        .should('contain', 'Queued your report for generation. You should receive an email shortly.');
  });

  it('searches by title', function() {
    const instructorTitle = 'Senior Instructor';

    // Search for the instructor using their title
    cy.searchForInstructor(instructorTitle);

    // Assert that the searched for title is present in the results
    cy.get('.table-container__content td')
        .should('contain', instructorTitle);
  });

  it('searches by incorrect name', function() {
    const wrongInstructorName = 'Mathew';

    // Search for the instructor using an incorrect spelling of their name
    cy.searchForInstructor(wrongInstructorName);

    // Assert results are empty
    cy.get('.table-container__content td')
        .should('contain', 'You do not currently have any instructors');
  });

  it('clears the search', function() {
    const instructorName = 'Thiesen';

    // Search for the instructor then clear the search
    cy.searchForInstructor(instructorName);
    cy.get('#btn-clear-search').click();

    // Assert the search field is empty
    cy.get('#q').should('be.empty');
  });
});
