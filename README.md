# JustWeather 🌐

Fast, sleek, and fully responsive — check the weather anywhere, anytime.  
Instant city search, clear forecasts, and current conditions — all with a secure serverless backend.

👉 **Live Demo:** [https://no-fuss-weather.netlify.app/](https://no-fuss-weather.netlify.app/)

## 💻 Getting Started

Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd weather-web-app
npm install
```

## Local Development

- **Frontend + Serverless Functions**:

```bash
npm run netlify:dev
```

## 🛠️ Tech Stack

This application is built with a React 19 + Vite stack for fast development, responsive UI, and optimized performance, while leveraging React Query for efficient caching and Netlify serverless functions to securely handle API keys and reduce backend latency.

- **React 19 + Vite** – Component-based, fast development, optimized performance.
- **TypeScript** – Type safety.
- **React Query** – Efficient caching for city search.
- **Axios** – HTTP requests.
- **Netlify Functions** – Secure serverless backend for API keys.
- **ESLint + Prettier** – Code quality and consistent formatting.
- **Cypress & Vitest** – Unit and E2E testing.
- **Rollup Visualizer** – Helps inspect bundle size and structure. More educational than necessary for a project of this scale.

## 🧪 Testing

Unit and E2E tests ensure reliability:

- **Unit tests**: Vitest + React Testing Library, isolated API mocks.
- **E2E tests**: Cypress simulates real user interactions.
- **Combined coverage**: Unit + E2E coverage collected with Istanbul.

```bash
npm run test           # Unit tests
npm run test:e2e       # E2E tests
npm run cypress:open   # E2E tests interactive
npm run coverage       # Combined coverage report
```

⚠️ **Warning:** Make sure the app is running locally (via `netlify:dev`) before running Cypress.

<details> <summary>📈 SEE UNIT TESTS REPORT</summary>

![Unit tests coverage report](screenshots/image.png)

</details>

<details> <summary>📈 SEE COMBINED TESTS REPORT</summary>

![Combined coverage report](screenshots/image-1.png)

</details>

## ♿ Accessibility

**JustWeather** is designed with accessibility in mind:

- **Keyboard navigation** – All interactive elements (search input, city options) are focusable and can be selected via **Enter** or **Space** keys.
- **ARIA roles & attributes** – Search results, errors, and loading states use proper roles (`role="option"`, `role="alert"`, `role="status"`) with `aria-live` for dynamic updates.
- **Semantic UI** – Headings, lists, and labels follow semantic HTML for assistive technologies.
- **Visual & non-visual feedback** – Icons have `aria-hidden` where decorative, and text alternatives for weather descriptions.

Verified with **Lighthouse**, achieving **100% accessibility score**.

<details> <summary>📈 SEE LIGHTHOUSE NAVIGATION PERFORMANCE REPORT</summary>

**Desktop:**

![Lighthouse Navigation Report Desktop](screenshots/image-2.png)

**Mobile:**

![Lighthouse Navigation Report Mobile](screenshots/image-3.png)

</details>

## 🚀 Deployment

The Weather app is deployed on **Netlify**.

[![Netlify Status](https://api.netlify.com/api/v1/badges/30afa6c9-d29d-4f59-a1c7-6f6a62e48fb5/deploy-status)](https://app.netlify.com/sites/no-fuss-weather/deploys)

- **Netlify** with serverless backend secures API keys and sensitive credentials.
- **Environment variables:** GEO_API_KEY, METEOMATICS_USER, METEOMATICS_PASS.
- **Serverless Lambda functions:** proxy requests, keeping secrets safe.

## ⚡ Performance

The application was audited with **Lighthouse** and achieved a **100% performance score**. Local DevTools metrics indicate a fast, responsive, and visually stable user experience.

### Local Performance Metrics

- **Largest Contentful Paint (LCP):** main content (`h1.app-title`) loads quickly, comfortably under the 2.5 s threshold for good performance.
- **Cumulative Layout Shift (CLS):** no unexpected layout shifts, providing a visually stable experience.
- **Interaction to Next Paint (INP):** user interactions (typing/selecting city) respond immediately, under the 200 ms threshold.

<details> <summary>📈 SEE LOCAL METRICS PERFORMANCE REPORT</summary>

![Performance local metrics report](screenshots/image-8.png)

</details>

### Implemented Optimizations

- React Query **caches city coordinates** for 5 min whereas weather data are always fresh.
- **Debounced search** (`1000ms`) avoids hitting Geo API limits.
- **Preloaded Meteomatics data** reduces redundant fetches.
- Shared `64×64` weather icons for current and forecast (forecast rendered `40×40` on desktop).
- Optimized Vite build with `esbuild`.
- **Bundle analysis**: main JS dominated by `react-dom-client.production.js` (~519 KB, ~70%), typical for React apps, but overall build is lightweight for a SPA.  
  👉 **Live Bundle Analysis Report:** [https://no-fuss-weather.netlify.app/bundle-analysis.html](https://no-fuss-weather.netlify.app/bundle-analysis.html)

### Data State Management

The app uses a component-driven approach with custom hooks and selective caching:

- **React Query** is used only for useCoordinates (city search) to cache repeated queries for 5 minutes.
- **Weather data** is always fetched fresh to ensure up-to-date information.
- **Custom hooks** encapsulate fetching, caching, and error handling, keeping components focused on rendering.

### Constraints

- Free Geo API plan (**1 request/sec, max 300/day**) and free netlify tier (300 credits) limits stress testing at high load.

<details> <summary>📈 SEE LIGHTHOUSE TIMESPAN PERFORMANCE REPORT</summary>

![Lighthouse Timespan Report Desktop](screenshots/image-4.png)

![Lighthouse Timespan Report Mobile](screenshots/image-5.png)

![Lighthouse Snapshot Report Desktop](screenshots/image-6.png)

![Lighthouse Snapshot Report Mobile](screenshots/image-7.png)

</details>
