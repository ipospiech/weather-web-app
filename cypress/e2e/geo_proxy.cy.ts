/// <reference types="cypress" />

describe('Geo Proxy Function', () => {
  it('returns city coordinates for London', () => {
    cy.request('/.netlify/functions/geo-proxy?q=London').then((response) => {
      expect(response.status).to.eq(200);

      const cities = JSON.parse(response.body);

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      expect(cities).to.be.an('array').and.not.to.be.empty;

      expect(cities[0]).to.have.property('name').and.include('London');
      expect(cities[0]).to.have.property('lat');
      expect(cities[0]).to.have.property('lon');
    });
  });

  it('returns 400 if query is missing', () => {
    cy.request({
      url: '/.netlify/functions/geo-proxy',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.eq('Missing query');
    });
  });
});
