/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when email not valid
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display threads page when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Enter email"]').should('be.visible');
    cy.get('input[placeholder="Enter password"]').should('be.visible');
    cy.get('main').within(() => {
      cy.get('button').contains(/^Login$/).click();
    });
  });

  it('should display alert when email is empty', () => {
    cy.get('main').within(() => {
      cy.get('button').contains(/^Login$/).click();
    });

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when email not valid', () => {
    cy.get('input[placeholder="Enter email"]').type('testuser');
    cy.get('main').within(() => {
      cy.get('button').contains(/^Login$/).click();
    });

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Enter email"]').type('test@gmail.com');
    cy.get('main').within(() => {
      cy.get('button').contains(/^Login$/).click();
    });

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.get('input[placeholder="Enter email"]').type('test@gmail.com');
    cy.get('input[placeholder="Enter password"]').type('wrongPassword');
    cy.get('main').within(() => {
      cy.get('button').contains(/^Login$/).click();
    });

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display threads page when email and password are correct', () => {
    cy.get('input[placeholder="Enter email"]').type('test-baru@gmail.com');
    cy.get('input[placeholder="Enter password"]').type('test123');
    cy.get('main').within(() => {
      cy.get('button').contains(/^Login$/).click();
    });

    cy.get('h2').contains('Diskusi tersedia').should('be.visible');
  });
});
