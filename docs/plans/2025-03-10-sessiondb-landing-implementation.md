# SessionDB Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the default Astro starter with a single-page SessionDB landing that leads with open-source value, a clear hero, “How it works,” feature grid (Available now + Roadmap with “Notify me” forms), and open-source CTA—using Static Forms for email capture and no commercial/pricing language.

**Architecture:** Single-page layout in Astro. Static content in `.astro` components; Preact only for the “Notify me when this is ready” form (client-side state + submit). Forms POST to `https://api.staticforms.dev/submit` with API key from env. All copy follows the “Community First” messaging (Core vs Roadmap, no Pro/Premium/upgrade).

**Tech Stack:** Astro 6, Preact (@astrojs/preact), Static Forms API, CSS (scoped in components or global in Layout). No backend; API key via `PUBLIC_STATIC_FORMS_API_KEY`.

---

## Task 1: Add Preact and configure Static Forms env

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`
- Create: `.env.example`

**Step 1: Install Preact integration**

Run:
```bash
npx astro add preact
```
Choose default options. Expected: `@astrojs/preact` and `preact` added to dependencies; `astro.config.mjs` updated with `integrations: [preact()]`.

**Step 2: Add env example for API key**

Create `.env.example` with:
```
PUBLIC_STATIC_FORMS_API_KEY=your_static_forms_api_key
```
Document that the key is from Static Forms and is used for “Notify me” forms.

**Step 3: Commit**

```bash
git add package.json package-lock.json astro.config.mjs .env.example
git commit -m "chore: add Preact and Static Forms env placeholder"
```

---

## Task 2: Update Layout (meta, title, base styles)

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: Set page title and meta**

- Set `<title>` to `SessionDB — The Open Source Database Proxy for Modern Teams`.
- Add `<meta name="description" content="SessionDB gives your team secure, AI-powered access to MySQL and Postgres—without sharing a single password." />`.
- Keep viewport, charset, and favicon as-is.

**Step 2: Add global base styles**

- Keep `html, body { margin: 0; width: 100%; min-height: 100%; }`.
- Add CSS custom properties for colors (e.g. `--color-primary`, `--color-text`, `--color-muted`, `--font-sans`) so sections can stay consistent.
- Ensure `box-sizing: border-box` and a single font stack for the site.

**Step 3: Verify**

Run: `npm run dev`. Open `/`. Confirm title and description in browser tab / devtools. Commit: `git add src/layouts/Layout.astro && git commit -m "feat: layout meta and base CSS variables"`.

---

## Task 3: Hero section

**Files:**
- Create: `src/components/Hero.astro`

**Step 1: Implement hero content**

- Headline: “The Open Source Database Proxy for Modern Teams”
- Sub-headline: “SessionDB gives your team secure, AI-powered access to MySQL and Postgres—without sharing a single password.”
- Primary CTA: link “View on GitHub” (use placeholder `https://github.com` or env `PUBLIC_GITHUB_REPO_URL` if you add it).
- Secondary CTA: link “Try the Demo” to `https://demo.sessiondb.in`.
- Use semantic `<header>`, `<h1>`, `<p>`, and two `<a>` buttons (style as primary vs secondary).

**Step 2: Style hero**

- Center content; comfortable max-width and padding.
- Buttons: primary (e.g. solid) for GitHub, secondary (outline or muted) for Demo.
- Mobile-friendly (stack or wrap as needed).

**Step 3: Wire into index**

- In `src/pages/index.astro`, remove `Welcome` and render `Hero` inside `<Layout>`.

**Step 4: Verify**

Run: `npm run dev`. Check `/` for headline, sub-headline, both CTAs; click Demo link → `https://demo.sessiondb.in`. Commit: `git add src/components/Hero.astro src/pages/index.astro && git commit -m "feat: add Hero with GitHub and Demo CTAs"`.

---

## Task 4: How it works (3-step section)

**Files:**
- Create: `src/components/HowItWorks.astro`

**Step 1: Add three steps**

- **Connect** — Link your MySQL and Postgres instances.
- **Proxy** — SessionDB masks credentials and acts as the secure gateway.
- **Govern** — Approve requests, audit every query, and use AI to write SQL (BYOK).

**Step 2: Structure and style**

- Section heading: “How it works” (or “How It Works”).
- Three cards or columns (numbered or icon + title + short description).
- Simple visual hierarchy; responsive grid (e.g. 1 col mobile, 3 col desktop).

**Step 3: Add to index**

- In `src/pages/index.astro`, import and render `<HowItWorks />` below `<Hero />`.

**Step 4: Verify**

Run: `npm run dev`. Confirm three steps visible and readable. Commit: `git add src/components/HowItWorks.astro src/pages/index.astro && git commit -m "feat: add How it works section"`.

---

## Task 5: Feature data and types

**Files:**
- Create: `src/data/features.ts`

**Step 1: Define “Available now” features**

Export an array of objects with at least: `id`, `title`, `description`. Use the 10 “Available now” features from the strategy doc (Secure Query Runner, Schema Discovery, Identity & User Management, Data-Level Access Control, Audit Logging, Approval Workflow, DB User Provisioning, Instance & AI Config, Multi-Database Support, Query History & Scripts) with their one-line descriptions.

**Step 2: Define “Roadmap” features**

Export a second array for the 4 roadmap features (Live Session Management, Alerting & Metrics, Reporting, TTL & Time-Based Access) with: `id`, `title`, `description`, `badge` (`'PLANNED'` or `'BETA'`).

**Step 3: Commit**

```bash
git add src/data/features.ts
git commit -m "feat: add feature data for Available now and Roadmap"
```

---

## Task 6: Feature grid — Available now

**Files:**
- Create: `src/components/FeatureGrid.astro`

**Step 1: Render “Available now” section**

- Section heading: “Available now” (or “Available Now”).
- Subtext: e.g. “The open source core you can use today.”
- Map over the “Available now” array from `src/data/features.ts`; render each as a card (title + description).
- Use full-color cards (no desaturation).

**Step 2: Layout and style**

- Responsive grid (e.g. 1–2–3 columns). Cards with padding, border or shadow, consistent typography.

**Step 3: Add to index**

- Import and render `<FeatureGrid />` below `<HowItWorks />`. Pass or import the “Available now” data.

**Step 4: Verify**

Run: `npm run dev`. Confirm all 10 features appear. Commit: `git add src/components/FeatureGrid.astro src/pages/index.astro && git commit -m "feat: add Available now feature grid"`.

---

## Task 7: Notify-me form (Preact + Static Forms)

**Files:**
- Create: `src/components/NotifyMeForm.tsx` (Preact)

**Step 1: Form markup and submit**

- `<form action="https://api.staticforms.dev/submit" method="POST">`.
- Hidden input: `name="apiKey"` value from `import.meta.env.PUBLIC_STATIC_FORMS_API_KEY`.
- Hidden input: e.g. `name="subject"` with value = feature name (prop).
- Visible: `<input type="email" name="email" required placeholder="Email" />`, `<button type="submit">Notify me when this is ready</button>`.
- Optionally add `name="message"` or similar if Static Forms expects it; keep required fields per Static Forms docs.

**Step 2: Client-side behavior (Preact)**

- Use `useState` for email and submitted state.
- On submit: either let native form POST (navigate away) or use `fetch` to POST and then set “We’ll notify you when [feature] is ready” and prevent default. If using `fetch`, read action and method from form, build FormData from inputs.
- Use `client:visible` or `client:idle` when embedding in Astro to avoid unnecessary hydration.

**Step 3: Handle missing API key**

- If `import.meta.env.PUBLIC_STATIC_FORMS_API_KEY` is missing, show a fallback message (e.g. “Notify me coming soon”) or hide the form so build doesn’t require the key.

**Step 4: Verify**

- In a roadmap card (next task), embed `<NotifyMeForm featureName="Live Session Management" client:visible />`. Run `npm run dev`, open page, submit form (with a test key in `.env`). Confirm submit works or fallback shows. Commit: `git add src/components/NotifyMeForm.tsx && git commit -m "feat: add NotifyMeForm with Static Forms"`.

---

## Task 8: Feature grid — Roadmap and notify CTA

**Files:**
- Modify: `src/components/FeatureGrid.astro` (or create `src/components/RoadmapGrid.astro` and use in index)

**Step 1: Roadmap section**

- Section heading: “Roadmap” (or “Coming next”).
- Subtext: e.g. “In development — notify me when ready.”
- Map over roadmap features from `src/data/features.ts`. Each card: title, description, badge (PLANNED or BETA) with desaturated or muted styling.

**Step 2: Embed NotifyMeForm**

- For each roadmap feature card, render `<NotifyMeForm featureName={feature.title} client:visible />` (or equivalent) so the form posts with that feature as subject.

**Step 3: Trust footnote**

- Below the roadmap grid, add the trust line: “The core proxy and query engine will always remain open source. Advanced governance features are currently in development.”

**Step 4: Verify**

Run: `npm run dev`. Check roadmap cards, badges, forms, and footnote. Commit: `git add src/components/FeatureGrid.astro src/pages/index.astro && git commit -m "feat: add Roadmap grid with Notify me forms and trust line"`.

---

## Task 9: Open Source CTA section

**Files:**
- Create: `src/components/OpenSourceCta.astro`

**Step 1: Copy and optional GitHub star**

- Line: “SessionDB is built by and for the community. Star us on GitHub to follow our progress toward the 1.0 release.”
- Link “Star us on GitHub” to the same repo URL as the hero (placeholder or env).
- Optional: add a GitHub Star button with live count (e.g. GitHub API or third-party badge). If deferred, a simple link is enough for this task.

**Step 2: Style**

- Section with clear spacing; optional subtle background or border to separate from feature grid.

**Step 3: Add to index**

- Render `<OpenSourceCta />` below the feature/roadmap section.

**Step 4: Verify**

Run: `npm run dev`. Confirm CTA and link. Commit: `git add src/components/OpenSourceCta.astro src/pages/index.astro && git commit -m "feat: add Open Source CTA section"`.

---

## Task 10: Index page order and cleanup

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Final section order**

- Hero → How it works → Feature grid (Available now + Roadmap) → Open Source CTA.
- Remove any leftover references to `Welcome.astro`.

**Step 2: Optional global footer**

- If desired, add a minimal footer (e.g. “Docs” link to `https://docs.sessiondb.in`, “Demo” to `https://demo.sessiondb.in`, “GitHub” to repo). Otherwise skip.

**Step 3: Build and smoke test**

Run:
```bash
npm run build
npm run preview
```
Expected: build succeeds; preview shows full page. Click Demo, GitHub, and at least one “Notify me” flow (or fallback).

**Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "chore: finalize index section order and cleanup"
```

---

## Task 11: GitHub repo URL configuration (optional)

**Files:**
- Modify: `.env.example`
- Modify: `src/components/Hero.astro` and `src/components/OpenSourceCta.astro`

**Step 1: Env and links**

- Add `PUBLIC_GITHUB_REPO_URL=https://github.com/your-org/sessiondb` to `.env.example`.
- In Hero and OpenSourceCta, use `import.meta.env.PUBLIC_GITHUB_REPO_URL` for “View on GitHub” and “Star us on GitHub” links, with fallback to `#` or `https://github.com` if unset.

**Step 2: Commit**

```bash
git add .env.example src/components/Hero.astro src/components/OpenSourceCta.astro
git commit -m "chore: configurable GitHub repo URL via env"
```

---

## Summary and execution

- **Tasks 1–4:** Stack, layout, hero, how it works.
- **Tasks 5–8:** Feature data, Available now grid, NotifyMeForm (Preact + Static Forms), Roadmap grid and trust line.
- **Tasks 9–11:** Open Source CTA, index cleanup, optional GitHub URL env.

**Reference:** @astro-preact (Preact in Astro). Static Forms: `action="https://api.staticforms.dev/submit"`, `method="POST"`, hidden `apiKey`, optional `subject`/feature name.

**Execution:** Use superpowers:executing-plans task-by-task, or subagent-driven development for per-task implementation and review.
