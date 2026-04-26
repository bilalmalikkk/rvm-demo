# Scandinavian Redesign Recommendations

This document outlines a practical redesign direction for `rvm-group`, inspired by Scandinavian digital design principles and the visual/content structure seen on Dignio's Karie page.

Goal: make the site feel calmer, cleaner, and more premium while improving readability, consistency, and trust.

---

## 1) Design Direction (What to emulate)

Scandinavian design on the web is typically:
- Functional first (every element has a purpose)
- Visually calm (fewer effects, fewer competing colors)
- Spacious (generous whitespace and clear hierarchy)
- Typographically strong (readable body text, elegant heading rhythm)
- Human and warm (soft neutrals, natural imagery, clear language)

For this project, that means:
- Reduce gradients, glow effects, and aggressive hover animations
- Increase whitespace and section rhythm
- Use a restrained color palette with one primary accent
- Improve text width and line-height for easy reading
- Standardize card, button, and heading styles across sections

---

## 2) Quick Visual Audit of Current Site

Based on current styles and components, the site already has a solid structure but feels visually noisy and inconsistent in places:

- **Color inconsistency:** strong blues/greens and dark gradients are mixed with neutral sections.
- **Typography inconsistency:** headings, letter spacing, and uppercase usage vary heavily across sections.
- **Animation intensity:** several components use lift effects, animated overlays, and strong shadows.
- **Section rhythm:** spacing and max-width behavior are not fully consistent.
- **Component style drift:** cards/buttons/icons vary significantly between pages.
- **Readability issues:** some body text blocks are too wide for comfortable reading.
- **Image treatment inconsistency:** varying aspect ratios and visual weight between sections.

---

## 3) Reference Pattern from Dignio (what works)

From the Karie reference page:
- Wide and quiet layout
- Soft neutral backgrounds
- Minimal chrome and subtle borders
- Clear headline + paragraph + image pattern
- Feature points shown simply (icon + short label)
- Very limited color accents
- Strong editorial hierarchy (eyebrow, heading, body, features)

This approach can map directly to your current multi-section architecture.

---

## 4) Proposed Design System Update (Foundation)

### 4.1 Color palette (calmer Scandinavian baseline)

Introduce a restrained palette in `src/styles/variables.css`:

- `--color-bg-canvas: #f7f6f4` (warm light background)
- `--color-bg-surface: #ffffff`
- `--color-bg-muted: #eef1ef` (soft section background)
- `--color-text-primary: #1f2a2a`
- `--color-text-secondary: #4d5b5b`
- `--color-border-subtle: #dde2df`
- `--color-accent: #2f6f68` (single brand accent)
- `--color-accent-hover: #255a54`

Guideline:
- Use one main accent and one hover state.
- Avoid multiple saturated accents in the same viewport.

### 4.2 Typography system

Adopt a simpler hierarchy:
- Eyebrow: 12-13px / 600 / uppercase / slight letter spacing
- H1: clamp(40px, 5vw, 64px), line-height 1.1-1.2
- H2: clamp(32px, 4vw, 48px), line-height 1.15-1.25
- H3: 24-30px
- Body large: 20px / 1.55
- Body regular: 16-18px / 1.6-1.75

Readability rules:
- Keep paragraph width around `60-75ch`
- Maintain consistent vertical rhythm (24/32/48 spacing scale)
- Avoid all-caps for long headings; reserve for short labels

### 4.3 Spacing and container grid

Standardize layout primitives:
- `container`: `max-width: 1200px; margin: 0 auto; padding-inline: clamp(16px, 3vw, 40px);`
- Section spacing: `padding-block: clamp(64px, 8vw, 120px);`
- Two-column blocks: `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 64px);`

This gives strong consistency and better responsiveness.

---

## 5) Priority Recommendations by Area

## 5.1 Header and navigation

Current issue: visually busy header and mixed spacing/weights.

Recommendations:
- Keep header white with subtle bottom border only (remove heavy shadow).
- Reduce nav font size variance; use one typographic style for all top-level links.
- Increase horizontal breathing room around logo and right actions.
- Dropdown menus: soft border, small radius, subtle shadow; avoid harsh contrast.
- Add clear active-state logic with one accent underline or color.

Files:
- `src/components/layout/Header/Header.module.css`

---

## 5.2 Hero sections (especially Home)

Current issue: dark gradient hero + animated overlays feel less Scandinavian.

Recommendations:
- Replace strong dark gradient with a calm neutral background.
- Remove pulsing radial overlays and ripple-style button effects.
- Keep one strong headline + one concise paragraph + 1-2 clean CTAs.
- Use editorial spacing and calmer button styles.

Files:
- `src/components/sections/Hero/Hero.module.css`
- `src/components/sections/WelfareTechnologyHero/WelfareTechnologyHero.module.css`
- `src/components/sections/AutomotiveHero/AutomotiveHero.module.css`

---

## 5.3 Content sections and cards

Current issue: too many card variants and hover behaviors.

Recommendations:
- Define one "standard content card" style and reuse it.
- Reduce elevation: softer shadows, more border-driven separation.
- Replace `translateY` hover jumps with subtle background/border changes.
- Keep icon containers simple (muted circular or rounded-square backgrounds).

Files:
- `src/components/sections/WelfareTechnologySolutions/WelfareTechnologySolutions.module.css`
- `src/components/sections/BusinessAreas/BusinessAreas.module.css`
- `src/components/sections/WhyChooseUs/WhyChooseUs.module.css`
- `src/components/sections/ProjectShowcase/ProjectShowcase.module.css`

---

## 5.4 Imagery and media treatment

Current issue: inconsistent image ratios, occasional broken visual hierarchy.

Recommendations:
- Define section-level image ratios (e.g., 16:10 for hero media, 4:3 for feature cards).
- Use consistent radius (8-12px).
- Ensure image containers preserve ratio before load to avoid layout shift.
- Add graceful fallbacks/placeholders when media fails to load.

Files:
- Multiple section-level `*.module.css` files with image blocks.

---

## 5.5 Buttons and interactive states

Current issue: varied button styles across sections.

Recommendations:
- Define 2 button variants only:
  - Primary: solid accent background
  - Secondary: subtle outline/ghost
- Use consistent height/padding/radius across all pages.
- Keep hover behavior subtle (shade shift, no dramatic movement).

Files:
- `src/styles/global.css` (new shared utility classes or component tokens)
- Section-specific CSS modules where buttons are custom.

---

## 5.6 Forms (contact)

Current issue: mixed visual language compared to calmer Scandinavian aesthetic.

Recommendations:
- Use white card + subtle border + restrained accent focus state.
- Increase input height and whitespace.
- Keep success/error states simple and clear.
- Keep form width readable and avoid overly dark background contrast.

Files:
- `src/components/sections/ContactCTA/ContactCTA.module.css`
- `src/components/sections/ContactCTA/ContactCTA.jsx`

---

## 5.7 Footer

Recommendations:
- Simplify visual hierarchy and reduce dense content clusters.
- Use neutral background and clearer grouping (company, resources, legal, contact).
- Keep typography smaller but readable, with more spacing between link groups.

Files:
- `src/components/layout/Footer/Footer.module.css`

---

## 6) Responsive Strategy Improvements

Observed need: some sections break at unusual zoom levels and ultra-narrow devices.

Recommendations:
- Prefer `clamp()` for typography and spacing instead of many abrupt breakpoints.
- Use content-first breakpoints: 1200, 992, 768, 480, 360.
- Avoid fixed pixel widths for media/cards unless bounded by `max-width: 100%`.
- Keep text containers to readable widths on large displays.
- Audit each two-column section to collapse gracefully into one column.

---

## 7) Content and Copy Style (important for Scandinavian tone)

Recommendations:
- Keep language plain and direct.
- Use shorter paragraphs (2-4 lines).
- Convert long blocks into "eyebrow + heading + short body + 3-4 key bullets."
- Focus on user value and clarity over marketing-heavy phrasing.

---

## 8) Accessibility and Usability Upgrades

Recommendations:
- Ensure text contrast meets WCAG AA.
- Keep minimum tap target at 44x44 for mobile interactions.
- Preserve visible focus states for keyboard users.
- Check heading order and semantic structure section-by-section.
- Provide descriptive alt text for all important imagery.

---

## 9) Suggested Rollout Plan

### Phase 1 (Fast wins: 1-2 days)
- Simplify hero visual style (remove intense gradients/overlays)
- Normalize button system (2 variants)
- Reduce shadows/hover movement globally
- Standardize max-width + section spacing on top 5 pages

### Phase 2 (Core polish: 3-5 days)
- Unify typography scale and heading styles
- Refactor major cards/components into shared visual patterns
- Improve image ratio consistency and placeholders
- Tune navbar + footer for cleaner visual hierarchy

### Phase 3 (Finish quality: 2-4 days)
- Full responsive pass at 1200/992/768/480/360
- Accessibility pass (contrast, focus, semantics)
- Content formatting pass for readability and scanability

---

## 10) Concrete Success Criteria

You can consider the redesign successful when:
- Every section feels visually related (same spacing, typography rhythm, button language)
- Users can scan key value propositions in seconds
- The page feels calm and premium (not visually loud)
- No section breaks at high zoom or narrow screens
- Content is easier to read and trust at first glance

---

## 11) Optional Next Step (if you want execution-ready specs)

Create a follow-up document with:
- Updated token table (exact CSS variable values)
- Component mapping (`old class` -> `new pattern`)
- Before/after UI snapshots per section
- Exact file-level implementation checklist

---

## References

- Dignio Karie reference page: https://dignio.com/no/karie/
- Smashing Magazine on Scandinavian design principles: https://smashingmagazine.com/2011/06/the-story-of-scandinavian-design-combining-function-and-aesthetics
- Nord Design System typography guidance: http://nordhealth.design/typography/
- NNGroup readability/topic references: https://www.nngroup.com/topic/readability/?asset=articles
