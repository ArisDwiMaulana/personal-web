---
name: Obsidian Protocol
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#c0c1ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#9699ff'
  on-tertiary-container: '#1d17b2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
typography:
  display-hero:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 22px
  label-mono-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies technical precision, operational focus, and quiet authority. Designed for a personal cybersecurity and systems administration knowledge repository, it fuses modern developer minimalism with terminal-inspired utility. The interface acts as a high-density, low-friction conduit for incident reports, architecture diagrams, command recipes, and security research.

### Emotional Signature
- **Controlled & Secure:** Evokes a calm command center—dark, sharp, orderly, and free of extraneous noise.
- **Engineered Precision:** Every border, tag, and line of code aligns to strict architectural rules.
- **High Readability:** Eliminates visual fatigue during long analysis sessions through deep slate backgrounds and high-contrast typographic rendering.

### Design Style
The aesthetic synthesizes **Technical Minimalism** with **Developer Log Elegance**. Surfaces rely on nuanced layered obsidian backgrounds, precise 1px micro-borders, and carefully targeted terminal accents (emerald, cyan, indigo). Visual interest is derived not from heavy shadows or decorative illustrations, but from rigorous typographic hierarchy, semantic color coding, and clean monospace metadata cues.

## Colors

The palette is engineered around an obsidian and deep-slate substrate punctuated by high-signal terminal emissives.

### Surface Architecture
- **Canvas Base (`#090D16`):** Deepest void background; used for the primary viewport canvas and deep negative space.
- **Surface Elevation 1 (`#0D1117`):** Core reading plane, code block backdrops, and navigation panels.
- **Surface Elevation 2 (`#161B22`):** Elevated cards, terminal prompt headers, and interactive floating surfaces.
- **Subtle Boundaries (`#232A35` & `#30363D`):** Low-contrast architectural borders providing structure without visual clutter.

### Semantic Accents
- **Primary Emerald (`#10B981`):** Represents verified states, active network interfaces, terminal success prompts, and primary interactions.
- **Secondary Cyan (`#06B6D4`):** Represents sysadmin pathways, operational metrics, protocols, and informational highlights.
- **Tertiary Indigo (`#6366F1`):** Represents defensive security, vulnerability disclosures, exploits, and deep architectural tags.
- **Text & Contrast:** Primary text is set to stark off-white (`#F0F6FC`), secondary technical metadata to muted steel (`#8B949E`), and disabled or structural glyphs to dark slate (`#484F58`).

## Typography

The typographic strategy balances long-form technical legibility with precise data-display characteristics.

### Family Roles
- **Primary Interface & Editorial (`Geist`):** Delivers clean geometry with engineered neo-grotesque proportions. Used across all titles, subheadings, and article body text to prevent eye strain during extended write-up analysis.
- **Monospace Precision (`JetBrains Mono`):** Applied exclusively to metadata, dates, command lines, configuration code blocks, architectural readouts, and taxonomy chips.

### Hierarchy & Cadence
- Long-form body text preserves a generous line-height (`28px` on `16px` font) to guarantee visual flow across complex technical terminology.
- Monospace labels enforce subtle uppercase tracking (`letterSpacing: 0.02em` to `0.04em`) to mirror command-line terminal readouts and diagnostic logs.

## Layout & Spacing

The layout is grounded in a restrained, content-first structural grid optimized for reading, code inspection, and architectural analysis.

### Grid & Form Factors
- **Desktop (>= 1024px):** A constrained central reading lane capped at `768px` for single-column technical articles, expanding to a 12-column layout (`1120px` max-width) for dashboard indices and tag directories. Fixed margins of `2rem` with `1.5rem` gutters.
- **Tablet (768px - 1023px):** Fluid grid collapsing side navigation to top metadata ribbons, keeping documentation column at `100%` width within `1.5rem` margins.
- **Mobile (< 768px):** Single-column fluid stream with `1rem` edge margins and `1rem` gutters. Elements reflow vertically, stack code header utilities, and render tags in horizontally scrollable rails.

### Spacing Rhythm
Vertical cadence strictly adheres to multiples of `0.25rem` (4px). Related command logs and explanations use `space-xs` and `space-sm`, while major conceptual blocks and topic sections separate along `space-lg` and `space-xl` thresholds.

## Elevation & Depth

This design system avoids traditional drop shadows and skeuomorphic blurs. Depth is produced strictly through **tonal stacking** and **crisp 1px boundary lines**.

### Elevation Tiers
1. **Level 0 (Canvas):** Pure `#090D16`. The static base holding all views.
2. **Level 1 (Panels & Surfaces):** `#0D1117` with a 1px solid border of `#232A35`. Applied to article wrappers, list items, and code execution consoles.
3. **Level 2 (Active & Floating):** `#161B22` with a 1px solid border of `#30363D`. Applied to popovers, search palettes (`Cmd+K`), dropdown filters, and active card states.

### Focus & Hover Accents
Interactive hover states elevate surfaces not by casting shadows, but by transitioning the 1px border color from `#232A35` to the semantic accent (`#10B981` for general links, `#06B6D4` for sysadmin references, `#6366F1` for security tags). Subtle radial background glows (opacity `< 0.04`) may appear behind terminal cards to simulate CRT phosphor persistence.

## Shapes

The system relies on compact, deliberate corner geometry (`level 1` - soft technical rounding).

- **Micro Components (Tags, Badges, Buttons, Inputs):** `0.25rem` (4px). Retains a sharp, instrumented aesthetic that matches monospace characters.
- **Containers & Surfaces (Cards, Terminal Windows, Dialogs):** `0.5rem` (8px). Softens larger blocks without losing structural rigidity.
- **Never Pill-Shaped:** Rounding above `0.5rem` is prohibited. Pill radii degrade the authoritative, terminal-driven visual posture.

## Components

### Buttons
- **Primary (Terminal Action):** Solid emerald background (`#10B981`), dark obsidian text (`#090D16`), font weight `500`. Hover shifts to `#059669`.
- **Secondary (Subtle Tool):** Surface background (`#161B22`), 1px border (`#30363D`), light grey text (`#F0F6FC`). Hover borders light up with `#06B6D4`.
- **Ghost (Action/Copy):** Transparent background, muted text (`#8B949E`), monospace font. Hover transitions text to `#F0F6FC`.

### Chips & Badges
- **Sysadmin Tag:** Monospace (`11px`), background `rgba(6, 182, 212, 0.1)`, text `#06B6D4`, 1px border `rgba(6, 182, 212, 0.25)`.
- **SecOps / Threat Tag:** Monospace (`11px`), background `rgba(99, 102, 241, 0.1)`, text `#6366F1`, 1px border `rgba(99, 102, 241, 0.25)`.
- **Status Badge (Live/Mitigated):** Small 6px pulsating circular dot with emerald or cyan fill, adjacent to monospace status text.

### Inputs & Search Bars
- Background set to `#0D1117`, border `#232A35`, text `#F0F6FC`, placeholder `#484F58`.
- Focus state shifts border directly to `#10B981` without an outer fuzzy focus ring; a 1px solid outline maintains surgical precision.

### Code Blocks & Terminal Windows
- Top bar displays simulated window controls (or file metadata like `path/to/daemon.conf`), with a quick-copy button in `JetBrains Mono`.
- Background `#0D1117`, border `#232A35`. Syntax highlighting utilizes high-saturation emeralds, cyans, and ambers against deep slate.

### Lists & Article Previews
- Minimal divider-based entries. Each row features a monospace date column (`#8B949E`), post title (`Geist`, `#F0F6FC`), and trailing taxonomy chips.
- Hover changes the title color to `#10B981` and applies a subtle left border highlight.

### Cards
- Clean, zero-shadow containers (`#0D1117`), structured via 1px `#232A35` border. On hover, the border shifts to `#30363D` with a subtle elevation shift to `#161B22`.