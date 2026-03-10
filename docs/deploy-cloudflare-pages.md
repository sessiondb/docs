# Deploying to Cloudflare Pages

This is a **static** Astro site. Use **Cloudflare Pages**, not Workers.

## Correct commands

| Action | Command |
|--------|--------|
| Build | `npm run build` |
| Deploy (build + upload) | `npm run deploy` |
| Deploy only (after build already ran) | `npm run deploy:pages` or `npx wrangler pages deploy ./dist` |

**Do not use** `wrangler deploy` — that is for Workers and will fail with "Missing entry-point".

## Cloudflare Pages (Git integration)

In **Cloudflare Dashboard → Pages → your project → Settings → Builds & deployments**:

1. **Build command:** `npm run build`
2. **Build output directory:** `dist`
3. **Deploy command:**  
   - **Preferred:** leave **empty** so Pages uploads `dist` automatically after the build.  
   - If your setup uses a separate deploy step, set it to:  
     `npm run deploy:pages`  
     or  
     `npx wrangler pages deploy ./dist`  
   - **Never** set it to `npx wrangler deploy` (Workers CLI).
