/// <reference types="cypress" />

describe('Weather App Homepage', () => {
  it('loads the homepage', () => {
    cy.visit('/');
    cy.contains('JustWeather').should('be.visible');
  });
});
