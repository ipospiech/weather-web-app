/// <reference types="cypress" />

describe('Weather App Homepage', () => {
  it('loads the homepage', () => {
    cy.visit('http://localhost:8888');
    cy.contains('JustWeather');
  });
});
