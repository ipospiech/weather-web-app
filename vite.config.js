/* eslint-disable */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import istanbul from 'vite-plugin-istanbul';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/*',
      extension: ['.ts', '.tsx'],
      cypress: true,
      requireEnv: false
    }),
    visualizer({
      filename: './dist/bundle-analysis.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    testTimeout: 10000,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'json'],
      reportsDirectory: './coverage'
    }
  },
  build: {
    minify: 'esbuild'
  }
});
