# @hillolbarman/ui

Shared UI component library used across [hillolbarman portfolio projects](https://github.com/hillol-kr-barman). Provides a unified design token system, semantic type-scale utilities, and reusable React components — so every project looks and behaves consistently with minimal per-project configuration.

## Installation

```bash
npm install @hillolbarman/ui
```

## Setup

### 1. Import the stylesheet

Add this once to your root CSS file, before your own `@theme` block:

```css
@import "@hillolbarman/ui/styles.css";
@import "tailwindcss";

@theme {
  /* Override accent to match your project */
  --color-accent:          #00d4dc;
  --color-accent-strong:   #00aeca;
  --color-background:      #0e1012;
  --color-background-soft: #1c2128;
  --color-surface:         #161a1e;
  --color-surface-strong:  #1c2128;
}
```

Every `.btn`, `.badge`, `.card-panel`, and type-scale class will automatically reflect the overridden accent colour.

### 2. Import components

```tsx
import { AuthPage, SiteHeader, SiteFooter } from '@hillolbarman/ui'
```

---

## Design tokens

Shared base tokens defined in `tokens.css`. Override the accent and background group per project; the text, border, and semantic tokens are shared.

| Token | Default | Notes |
|---|---|---|
| `--color-accent` | `#9eff1f` | Override per project |
| `--color-accent-strong` | `#7acc00` | Override per project |
| `--color-background` | `#0d0f0e` | Override per project |
| `--color-background-soft` | `#1a1f1c` | Override per project |
| `--color-surface` | `#161b18` | Override per project |
| `--color-surface-strong` | `#1a1f1c` | Override per project |
| `--color-border` | `rgba(255,255,255,0.07)` | Shared |
| `--color-border-strong` | derives from `--color-accent` | Auto-computed |
| `--color-text` | `#eef0f3` | Shared |
| `--color-muted` | `#9aa3b0` | Shared |
| `--color-subtle` | `#6b7685` | Shared |
| `--color-soft` | derives from `--color-accent` | Auto-computed |
| `--color-danger` | `#f87171` | Shared |
| `--color-success` | `#4ade80` | Shared |
| `--font-sans` | `Space Grotesk` | Shared |
| `--font-mono` | `DM Mono` | Shared |
| `--text-ui` | `0.82rem` | Buttons, badges, nav |
| `--text-ui-sm` | `0.72rem` | Chips, timestamps |
| `--text-ui-xs` | `0.65rem` | Smallest labels |

**Per-project accent colours:**

| Project | Accent |
|---|---|
| Resume / Portfolio | `#9eff1f` (green) |
| Git Visualiser | `#00d4dc` (cyan) |
| Grounded | `#f59e0b` (amber) |

---

## Type scale

Semantic typography utility classes. Use these in JSX instead of raw font-size and colour values.

| Class | Usage |
|---|---|
| `.type-eyebrow` | Small uppercase label above headings |
| `.type-hero` | Large display heading on landing pages |
| `.type-page-title` | Top-level page heading |
| `.type-section-title` | Major section heading |
| `.type-card-title` | Heading inside a card or panel |
| `.type-body` | Standard paragraph text |
| `.type-body-strong` | Slightly emphasised body text |
| `.type-label` | Form labels and small descriptive text |

---

## Component utilities

CSS classes for consistent structural patterns:

| Class | Usage |
|---|---|
| `.btn` | Primary accent button |
| `.btn-ghost` | Ghost / secondary button |
| `.badge` | Small inline label |
| `.card-panel` | Standard bordered card |
| `.card-panel-soft` | Softer card variant |
| `.card-panel-tight` | Compact card variant |
| `.section-header` | Section heading row with bottom border |
| `.section-title` | Uppercase label inside a section header |

---

## Components

Components are added in Phase 2. See [CHANGELOG](./CHANGELOG.md) for progress.

| Component | Status |
|---|---|
| `AuthPage` | Planned — login, register, forgot-password, reset-password |
| `SiteHeader` | Planned — navigation, auth chip, mobile menu |
| `SiteFooter` | Planned — nav links, socials, copyright |
| `BackgroundBeams` | Planned — animated SVG background decoration |
| `ProjectCard` | Planned — featured and list variants |
| `AlertDialogBox` | Planned — accessible confirm/cancel dialog |
| `ConfirmationMessage` | Planned — toast-style success notification |
| `ShareDocumentModal` | Planned — share URL copy modal |

---

## Development

```bash
npm install
npm run dev            # watch mode — rebuilds on save
npm run storybook      # component explorer on http://localhost:6006
npm run type-check     # TypeScript strict check
npm run build          # production build to dist/
```

---

## Publishing a new version

1. Update `version` in `package.json`
2. Add an entry to `CHANGELOG.md`
3. Commit, tag, and push:

```bash
git add .
git commit -m "chore: release v0.2.0"
git tag v0.2.0
git push origin main --tags
```

GitHub Actions picks up the tag and publishes to npm automatically. Requires `NPM_TOKEN` set in the repository secrets (`Settings → Secrets and variables → Actions`).

---

## Licence

MIT © [Hillol Barman](https://github.com/hillol-kr-barman)
