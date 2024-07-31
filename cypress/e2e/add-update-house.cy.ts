/// <reference types="cypress" />

describe('AddUpdateHouseComponent', () => {
  const login = (username: string, password: string) => {
    cy.get('input[formcontrolname="username"]').type(username);
    cy.get('input[formcontrolname="password"]').type(password);
    cy.get('button[type="submit"]').click();
  };

  beforeEach(() => {
    cy.visit('http://localhost:4200/');
    login('admin', 'p@ssw0rd');
    cy.get('.create-btn').first().click();
  });

  it('should display the form', () => {
    cy.get('app-add-update-house').should('exist');
  });
  it('should display validation errors for required fields', () => {
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[id="house_number"]').focus().blur();
    cy.get('input[id="block_number"]').focus().blur();
    cy.get('input[id="land_number"]').focus().blur();
    cy.get('select[id="model"]').focus().blur();
    cy.get('select[id="house_type"]').focus().blur();
    cy.get('input[id="price"]').focus().blur();

    cy.get('input[id="house_number"] + .text-danger').should(
      'contain',
      'House number is required'
    );
    cy.get('input[id="block_number"] + .text-danger').should(
      'contain',
      'Block number is required'
    );
    cy.get('input[id="land_number"] + .text-danger').should(
      'contain',
      'Land number is required'
    );
    cy.get('select[id="model"] + .text-danger').should(
      'contain',
      'Model is required'
    );
    cy.get('select[id="house_type"] + .text-danger').should(
      'contain',
      'House type is required'
    );
    cy.get('input[id="price"] + .text-danger').should(
      'contain',
      'Price must be greater than 0'
    );
  });
});
