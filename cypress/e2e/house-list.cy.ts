/// <reference types="cypress" />

describe('HouseListComponent', () => {
  const login = (username: string, password: string) => {
    cy.get('input[formcontrolname="username"]').type(username);
    cy.get('input[formcontrolname="password"]').type(password);
    cy.get('button[type="submit"]').click();
  };
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });

  it('should display the house list', () => {
    cy.intercept('GET', '**/houses').as('getHouses');

    cy.get('.container').should('exist');
    cy.get('.container').children().should('have.length.greaterThan', 0);
  });

  it('should filter houses based on the form input,block_number', () => {
    cy.get('input[formcontrolname="block_number"]').type('0');
    cy.get('.container').children().should('not.have.lengthOf.lessThan', 1);
  });
  it('should filter houses based on the form input,house_number', () => {
    cy.get('input[formcontrolname="house_number"]').type('12');
    cy.get('.container').children().should('have.length.greaterThan', 0);
  });
  it('should filter houses based on the form input,min price', () => {
    cy.get('input[formcontrolname="min_price"]').type('1');
    cy.get('.container').children().should('have.length.greaterThan', 0);
  });
  it('should filter houses based on the form input,max price', () => {
    cy.get('input[formcontrolname="max_price"]').type('10000000');
    cy.get('.container').children().should('have.length.greaterThan', 0);
  });

  it('should navigate to add house page when create new house button is clicked', () => {
    login('admin', 'p@ssw0rd');
    cy.get('.create-btn').first().click();
    cy.url().should('include', '/house/add');
  });
});
