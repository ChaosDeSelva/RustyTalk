describe('404 Not Found Page', () => {
    beforeEach(() => {
        cy.visit('/error-route', { failOnStatusCode: false });
    });

    it('displays the 404 Not Found message', () => {
        cy.get('[id=404-wrapper]')
            .should('contain.text', '404 Page Not Found');
    });

    it('provides a link back to the login page', () => {
        cy.get('[id="404-login-btn"]')
            .should('have.text', '[ Login ]')
            .click();

        cy.url().should('include', '/');
    });
});
