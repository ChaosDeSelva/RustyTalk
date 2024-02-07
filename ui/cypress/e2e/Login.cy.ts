describe('Login Page Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('successfully logs in and redirects to the dashboard', () => {
        cy.get('input[name="username"]').type('John Doe');
        cy.get('form').submit();
        cy.url().should('include', '/chatroom');
    });

    it('prevents login with invalid characters in username', () => {
        cy.get('input[name="username"]').type('invalid@username!');
        cy.get('form').submit();
        cy.get('input[name="username"]:invalid').should('exist'); // HTML5 validation
    });

    it('requires username to log in', () => {
        cy.get('form').submit();
        cy.get('input[name="username"]:invalid').should('exist');
    });

    it('prevent access to chatroom with invalid user session', () => {
        cy.visit('/chatroom')
        cy.url().should('not.include', '/chatroom');
    });
});

