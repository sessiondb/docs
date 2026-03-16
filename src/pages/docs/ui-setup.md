---
layout: ../../layouts/DocsLayout.astro
title: "Frontend UI Setup"
---

# Frontend Setup & Configuration

The SessionDB frontend is a standalone React 18 application built with Vite. It compiles down to a highly optimized static site bundle designed to be served directly by the SessionDB backend.

## Local Development (Standalone)

If you are developing features for the UI outside of the standard `scli` pipeline:

```bash
cd ui/
npm install
npm run dev
```

The frontend relies heavily on dynamic configuration injection rather than static `.env` build variables.

### `window._env_` Configuration

To ensure a single built Docker image can run anywhere, the gateway injects standard variables at runtime:

```javascript
// Example Output served by the Backend at /env.js
window._env_ = {
  API_URL: "https://api.yourdomain.com",
  VERSION: "v1.2.0"
}
```
