/* eslint-disable prettier/prettier */
/// <reference types="cypress" />

describe('Weather App User Journey', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('allows a user to search for a city, see weather and forecast', () => {
    // Search for a valid city
    cy.get('.search-input').type('London');
    cy.get('.search-item').contains('London, GB').click();
    cy.contains('London, GB').should('be.visible');

    // See current weather
    cy.get('[data-testid=current-weather]').within(() => {
      cy.contains('Wind').should('exist');
      cy.contains('Pressure').should('exist');
      cy.contains('UV Index').should('exist');
    });

    // See forecast
    cy.get('[data-testid=forecast]').within(() => {
      cy.get('[data-testid=forecast-day]').should('have.length', 5);
    });
  });

  it('handles city not found', () => {
    cy.get('.search-input').type('looooo');
    cy.get('.search-status').contains('City not found').should('exist');
  });

  it('allows selecting a city with keyboard (Enter/Space)', () => {
    cy.get('.search-input').type('London');
    cy.get('.search-item').contains('London, GB').focus().type(' ');
    cy.contains('London, GB').should('be.visible');
  });

  it('shows error message if weather API fails', () => {
    cy.intercept('GET', '/.netlify/functions/weather-proxy*', {
      statusCode: 500,
      body: {}
    });

    cy.get('.search-input').type('London');
    cy.get('.search-item').contains('London, GB').click();
    cy.contains('Something went wrong, please try later').should('be.visible');
    cy.contains('Failed to load forecast').should('be.visible');
  });
});
