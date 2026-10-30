---
name: Clinical Clarity
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3d4947'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#006947'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855b'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-num:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
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
  space-xl: 2rem
---

## Brand & Style

This design system expresses pure clinical precision, absolute safety, and frictionless patient-clinician trust. It merges a modern biomedical laboratory aesthetic with the ergonomics of consumer-grade digital tools. The interface feels antiseptic without feeling sterile, welcoming without sacrificing authority, and meticulously organized.

### Core Visual Principles
- **Clinical Precision:** Crisp white canvases, exact micro-alignments, hairline delineation, and high typographic contrast ensure immediate legibility under stress or visual fatigue.
- **Cognitive Calm:** Controlled exposure of deep emerald, tranquil teal, and balanced slate removes cognitive load, anchoring complex medication schedules into digestible, actionable views.
- **Unwavering Safety:** Strict color coding for medicinal status states (Safe, Caution, Alert, Verified) leaves zero room for ambiguity.
- **Tactile Softness:** Subtly rounded corners, micro-diffused ambient drop shadows, and high-clarity micro-borders give clinical artifacts a friendly, approachable human feel.

## Colors

The palette establishes an immediate atmosphere of pharmaceutical integrity and clear feedback. Built around clinical teals, verifying emeralds, and diagnostic sky blues, the foundation relies on neutral slate grays against ultra-clean backgrounds.

### Palette Architecture
- **Primary (`#0D9488` / Medical Teal):** The primary brand and action driver. Conveys pharmaceutical discipline and technical authority. Used for primary CTAs, active tab indicators, and primary navigational waypoints.
- **Secondary (`#0284C7` / Diagnostic Cerulean):** Trust-building informational tone. Deployed for informational highlights, schedule tracking, dose measurement metrics, and secondary interactions.
- **Tertiary (`#10B981` / Verification Emerald):** Represents safe states, successful label scans, verified dosages, and non-conflicting drug regimens.
- **Neutral (`#64748B` / Slate Foundation):** Anchored by Slate 50 (`#F8FAFC`) for foundation canvas fills, Slate 200 (`#E2E8F0`) for structural hairline borders, Slate 700 (`#334155`) for readable secondary copy, and Slate 900 (`#0F172A`) for high-contrast primary text.

### Clinical Status System
- **Verified / Safe:** `#10B981` (background: `#ECFDF5`, border: `#A7F3D0`, text: `#065F46`)
- **Expiring / Caution:** `#F59E0B` (background: `#FFFBEB`, border: `#FDE68A`, text: `#92400E`)
- **Expired / Danger / Contraindication:** `#EF4444` (background: `#FEF2F2`, border: `#FECACA`, text: `#991B1B`)
- **Prescription Info / Neutral State:** `#0284C7` (background: `#F0F9FF`, border: `#BAE6FD`, text: `#075985`)

## Typography

Typography balances clinical legibility with human-centered warmth:
- **Plus Jakarta Sans** is designated for top-level headers, card titles, and scan recognition readouts. Its soft geometric curves remove clinical intimidation while retaining institutional structure.
- **Inter** handles all body content, dosages, interaction labels, and tabular metadata. It guarantees extreme clarity even at small scales (`11px` - `13px`) across drug warnings and frequency instructions.
- Numeric characters and dosage amounts (`mg`, `ml`, `tablets`) always use tabular figure features to prevent alignment shift across scheduling dashboards.

## Layout & Spacing

The layout is built upon an 8pt base grid for spacing and component sizing, coupled with a 4pt sub-grid for icons and badges. 

### Grid & Responsiveness
- **Desktop (>= 1280px):** 12-column fluid grid, maximum content container of `1280px`, `1.5rem` (`24px`) gutters, and `2rem` (`32px`) margins. Sidebar navigation is fixed at `280px` width.
- **Tablet (768px - 1279px):** 8-column grid with `1.25rem` (`20px`) gutters and `1.5rem` (`24px`) margins. Side-by-side scanner views collapse into stacked progressive disclosure panels.
- **Mobile (< 768px):** 4-column layout with `1rem` (`16px`) gutters and `1rem` (`16px`) margins. Primary actions and scan targets stay within bottom thumb zones.

## Elevation & Depth

Visual hierarchy is achieved through crisp surface boundaries paired with ultra-diffused, ambient slate drop shadows rather than heavy structural overlays.

### Elevation Levels
- **Canvas Base (`Level 0`):** Pure `#F8FAFC` (Slate 50). Background surfaces are clean and non-distracting.
- **Card & Tile Surface (`Level 1`):** Pure White (`#FFFFFF`) with a 1px border of `#E2E8F0` and an ultra-soft drop shadow: `0 1px 3px rgba(15, 23, 42, 0.03), 0 4px 12px rgba(15, 23, 42, 0.02)`.
- **Interactive / Hover Surface (`Level 2`):** Pure White (`#FFFFFF`) with border `#CBD5E1` and enhanced shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 10px 20px -2px rgba(15, 23, 42, 0.04)`.
- **Flyouts, Dropdowns & Scanned Detail Drawers (`Level 3`):** Pure White (`#FFFFFF`) with border `#E2E8F0` and shadow: `0 10px 25px -3px rgba(15, 23, 42, 0.07), 0 4px 10px -2px rgba(15, 23, 42, 0.03)`.
- **Critical Alerts & Drug Interaction Modals (`Level 4`):** Pure White (`#FFFFFF`) floating over a `#0F172A` backdrop at `45%` opacity with blur `8px`. Box shadow: `0 20px 35px -5px rgba(15, 23, 42, 0.12), 0 10px 15px -5px rgba(15, 23, 42, 0.04)`.

## Shapes

The design uses balanced, modern curvature that eliminates harsh clinical edges while maintaining precise architectural alignment:
- Standard UI cards, clinical records, and prescription wrappers use `16px` to `20px` radius (`rounded-lg` to `rounded-xl`).
- Inputs, buttons, and segmented pickers sit cleanly at `8px` to `10px` (`rounded-md`).
- Status badges, micro-tags, and avatar identifiers utilize fully rounded pill formats (`9999px`) to immediately differentiate them from actionable containers.

## Components

### Buttons
- **Primary Button:** Background `#0D9488`, foreground `#FFFFFF`, border `none`, radius `10px`. Hover state shifts to `#0F766E` with subtle ambient glow (`0 4px 12px rgba(13, 148, 136, 0.25)`). Active state scales to `98%`.
- **Secondary Button:** Background `#FFFFFF`, foreground `#0F172A`, border `1px solid #E2E8F0`, radius `10px`. Hover brings background to `#F8FAFC` and border to `#CBD5E1`.
- **Destructive Button:** Background `#FEF2F2`, foreground `#DC2626`, border `1px solid #FECACA`. Hover changes background to `#FEE2E2`.

### Status Badges & Chips
- Designed as pills (`rounded-full`) with uppercase or semi-bold micro-labels (`label-sm`).
- Include a leading `6px` solid status indicator dot.
- **Verified:** Background `#ECFDF5`, text `#065F46`, dot `#10B981`.
- **Safe:** Background `#F0FDFA`, text `#115E59`, dot `#0D9488`.
- **Expiring Soon:** Background `#FFFBEB`, text `#92400E`, dot `#F59E0B`.
- **Expired / Conflict:** Background `#FEF2F2`, text `#991B1B`, dot `#EF4444`.

### Input Fields & Search Bars
- Background `#FFFFFF`, border `1px solid #E2E8F0`, radius `10px`, padding `12px 16px`, placeholder color `#94A3B8`.
- Focus state activates an outline ring: `0 0 0 3px rgba(13, 148, 136, 0.15)` and border transitions to `#0D9488`.

### Medicine & Prescription Cards
- Container has background `#FFFFFF`, border `1px solid #E2E8F0`, border-radius `18px`, padding `20px`.
- Features an upper metadata band (Drug Name, Strength, Badge), a central administration schedule (e.g., Morning / Evening tags), and a bottom-docked status indicator showing remaining pill counts or days until expiration.

### Interactive Dose Checkboxes & Radio Elements
- Custom pill controls with a smooth `200ms` check state transition.
- Unchecked: `1px solid #CBD5E1`, background `#FFFFFF`.
- Checked: Background `#0D9488`, border `#0D9488`, displaying an internal crisp white checkmark SVG.

### Medicine Scanner Viewfinder
- A dedicated optical recognition component with a semi-opaque `#0F172A` vignette (`40%` opacity).
- Features clean white corner markers (`radius 8px`, `border-width 3px`), a gentle horizontal animated laser sweep (`#10B981` at `70%` opacity with a `4px` blur), and a real-time status pill below reading "Align text within box".