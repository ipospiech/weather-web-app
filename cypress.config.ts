import { defineConfig } from 'cypress';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    // local Netlify dev server
    baseUrl: 'http://localhost:8888',

    // test specs
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',

    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    }
  }
});
