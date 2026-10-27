# Spec: Page Split + System Theme

Status: approved by user, pending implementation

## Goal

The single long home page feels cluttered. Split into distinct pages with clean URLs, and make the theme follow the OS preference instead of hardcoding dark.

## Part A — Pages (6 routes, ~40-line custom router, no dependency)

| Route | Content |
|---|---|
| `/` | Hero + Manifesto + Stats (closing "GTAno report") |
| `/about` | About + Certifications + Timeline |
| `/research` | Research |
| `/projects` | Projects |
| `/blog` | Blog |
| `/contact` | Contact |

- New file `src/router.jsx`: tiny router (route state from `location.pathname`, listens to `popstate`, exposes `navigate(path)`, `Link` component with real `href` → `<a>` so links work as normal). Scroll to top on navigation. That's it.
- App.jsx: `<main>` renders the page for the current route; lazy components stay. World decorations (Particles, CodeBackground, noise, scanlines, ScrollProgress, Wasted, Confetti, Footer) stay global across pages.
- Dropped components (removed from App): Minimap (single-page radar), ScrollIndicator (home-only), SectionDivider.
- BackToTop shown only on long pages (about, projects, blog).
- `public/_redirects`: `/* /index.html 200` for clean URL refreshes.
- Nav links become `Link`s; active page gets the existing active style.
- CommandPalette: entries navigate pages via `navigate()` (shortcuts preserved).
- per-page `document.title` + canonical updated on route change.

## Part B — Theme (system-follow with manual override)

- First load: follow `matchMedia('(prefers-color-scheme: dark)')`. If localStorage `theme` exists, honor saved value.
- Toggle button saves to localStorage (manual override wins thereafter).
- While no saved preference, listen to `change` on the media query and live-follow OS switches.
- Inline script in `index.html` sets `data-theme` before first paint (no dark flash). CSP already allows `unsafe-inline` scripts.
- Nav.jsx drops its hardcoded `useState(true)`; theme logic lives in a small `useTheme` hook used by Nav.
- Update `<meta name="theme-color">` to match active theme.

## Out of scope

404 page, route transitions/animations, Minimap redesign. Can add later.

## Verification

- Build clean; preview server: nav to each route directly + refresh on a deep URL (redirects work), theme toggle persists across reload, first load follows OS (dark and light), no flash of wrong theme, CommandPalette shortcuts land on pages.
- gitleaks before deploy.
