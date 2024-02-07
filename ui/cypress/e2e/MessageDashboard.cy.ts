describe('Message Dashboard', () => {
    const mockUser = 'John Doe'

    beforeEach(() => {
        cy.visit('/')
        cy.get('input[name="username"]').type(mockUser);
        cy.get('form').submit();
    });

    it('shows logged in user', () => {
        cy.get('[id=user-wrapper]').should('contain', mockUser);
    });

    it('allows sending a message', () => {
        const testMessage = 'Hello, world!';
        cy.get('input[name="message"]').type(testMessage);
        cy.get('form').submit();
        cy.get('[id=message-pane]').should('contain', testMessage);
    });

    it('can logout', () => {
        cy.get('[id=user-wrapper]').find('li.highlighted').click();
        cy.url().should('include', '/');
    });
});
