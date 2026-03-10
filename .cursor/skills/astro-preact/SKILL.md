---
name: astro-preact
description: Use Astro with Preact for interactive components and islands. Apply when building or modifying Astro sites, adding client-side interactivity, or when the user requests Astro with Preact. Covers setup, client directives, and conventions.
---

# Astro with Preact

Use Preact (not React) for any interactive UI in Astro. Keep static content in `.astro`; use Preact (`.tsx`/`.jsx`) only where client-side state or hydration is needed.

## Setup

1. Install the integration and Preact:

```bash
npx astro add preact
```

Or manually:

```bash
npm i @astrojs/preact preact
```

2. Register in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [preact()],
});
```

## Using Preact in Astro

- **File extension:** `.tsx` or `.jsx` for Preact components.
- **Import in Astro:** Import the component and use a **client directive** so it hydrates.

```astro
---
import MyButton from '../components/MyButton.tsx';
---
<MyButton client:load />
```

**Client directives (use the least hydration needed):**

| Directive | When to use |
|-----------|-------------|
| `client:load` | Critical above-the-fold interactivity (e.g. primary CTA). |
| `client:idle` | Non-critical; hydrate after main thread is idle. |
| `client:visible` | Only when component enters viewport. |
| `client:only="preact"` | Preact-only (no SSR); use for heavy client-only widgets. |

Prefer `client:visible` or `client:idle` over `client:load` when the component is below the fold.

## Conventions

- **No classes:** Use function components only (per project rules).
- **Props:** Type with TypeScript interfaces; keep props minimal.
- **Styling:** Use Astro-scoped styles in the parent `.astro` when possible; for component-scoped CSS use Preact’s inline styles or a single shared stylesheet.
- **State:** Use Preact’s `useState` / `useEffect` (or `useSignal` if using Preact Signals) only inside `.tsx` components that are hydrated.
- **Composition:** Compose Preact components inside other Preact components; use Astro to lay out pages and pass static content as slots.

## Example

**`src/components/NotifyMeButton.tsx`** (Preact — needs click + state):

```tsx
import { useState } from 'preact/hooks';

interface Props {
  featureName: string;
}

export default function NotifyMeButton({ featureName }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // submit logic
    setSubmitted(true);
  };

  return submitted ? (
    <p>We'll notify you when {featureName} is ready.</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        placeholder="Email"
        required
      />
      <button type="submit">Notify me when this is ready</button>
    </form>
  );
}
```

**In a page (Astro):**

```astro
---
import NotifyMeButton from '../components/NotifyMeButton.tsx';
---
<div class="roadmap-card">
  <h3>Live Session Management</h3>
  <p>Monitor and terminate active DB connections.</p>
  <NotifyMeButton featureName="Live Session Management" client:visible />
</div>
```

## When Not to Use Preact

- Static text, images, or layout: use `.astro` only.
- Simple links or anchors: plain HTML in Astro.
- No event handlers or client state: no need for Preact or a client directive.

## Summary

- Use **Astro** for pages, layout, and static content.
- Use **Preact** only for components that need client-side interactivity; pair with `client:idle` or `client:visible` when possible.
- Keep components as functions, type props, and avoid unnecessary hydration.
