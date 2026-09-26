# Aryan — Brand & Design System Guide

Source of truth for the visual language of this portfolio. It is a direct adaptation of the **Meeko** Framer template (audited in `context.md`, reference video/frames in the repo root) onto Hanumakonda Aryan's real content — same design system, same motion language, no template placeholder copy, no fabricated stats or testimonials.

---

## 1. Brand Overview & Design Philosophy

**What this site is:** an editorial, high-contrast personal portfolio for an AI/ML engineer — not a corporate template, not a design-agency site. The tone is confident but plain-spoken: large type says the headline once, body copy explains it once, and every number on the page is real.

**Design principles, in order of priority:**
1. **Honesty over polish.** No fabricated testimonials, no inflated stats, no "screenshot" mockups of projects that don't have real screenshots yet. This constraint came directly from the existing content voice ("Preview cards, not screenshots," "no fabricated screenshots" in the footer) and it overrides any temptation to fill a template slot with plausible-looking fake content.
2. **One character, consistently used.** The 3D-cartoon mascot (curly hair, glasses, blue jacket) is Aryan's visual stand-in everywhere a "photo" would go in the source template — hero avatar, About portrait, Contact portrait. It is never mixed with a real photo in the current build.
3. **Structure before decoration.** Every section borrows Meeko's exact spacing/radius/border rhythm before any content-specific styling is added. Consistency of the frame is what makes the site feel designed rather than assembled.
4. **Editorial scale.** Headlines are large and centered at the section level (per the `Heading 1` / `Display` presets); body copy stays modest (18–22px) so the size contrast does the work.

**What was intentionally *not* copied from the source template:** the fake testimonials carousel ("Natalie Brooks, Marketing Manager"), the inflated "15 years / 80+ projects / 10+ design awards" stat block, the generic freelance blog, and the "Use For Free / Made in Framer" template chrome. Where the template had a content slot Aryan doesn't have real material for, the *section pattern* was kept and re-pointed at real content instead (see §7 for the mapping).

---

## 2. Logo Guidelines

There is no wordmark logo. The brand mark is:
- **Text logo:** the plain word **"Aryan"**, set in body type at `heading-4` weight (500), no icon, no lockup — matches Meeko's own header treatment (`Meeko` as bare text, no icon).
- **Character mark:** the mascot illustration functions as the personal "avatar" logo wherever a photo/headshot would normally go. It is always presented as a circular crop, cropped tight to the face/shoulders (not full body), with a `1–2px` dark or white border depending on background.
  - On light backgrounds (hero): `2px solid var(--dark)` border.
  - On dark backgrounds (contact/footer): `2px solid var(--white)` border.
- **Clear space:** treat the avatar circle's own diameter as the minimum clear space on all sides.
- **Don't:** stretch the mascot, recolor it, place it at an angle, or use a full-body pose where a face-crop is expected (full-body poses are reserved for the About/Contact card illustrations, not the avatar bubble).

---

## 3. Color Palette

Colors are used as flat, pastel section-background "paper" tones, never as gradients. Every tone has a matching **hover** (for interactive fills) and **soft** (for tints/badges) variant.

### Base
| Token | Hex | Use |
|---|---|---|
| Dark | `#1D1D1D` | Text, borders, footer/contact background |
| White | `#FFFFFF` | Card fills, default section background |
| Light | `#F7F7F7` | About / Certifications section background |
| Purple | `#E3E3FF` | Stats section background |
| Blue | `#E3F2FF` | Accent / badge tint |
| Pink | `#FFE3FB` | Accent / badge tint |
| Yellow | `#FFE7A9` | Primary CTA fill |
| Green | `#DBF5F0` | Accent / badge tint |
| Lime | `#E9FAC0` | Reserved accent (unused currently — available for future sections) |
| Powder | `#FBEBEA` | Reserved accent |
| Red | `#FABFC9` | Reserved / error state only |
| Main Blue | `rgba(10,82,240,0.36)` over `#A9C2FB` | Hero background wash |

### Hover
`Blue #D1E8FD` · `Green #C8F0E8` · `Purple #D8D8FF` · `Pink #F9D4F4` · `Yellow #FEDE8D` · `Lime #DBF2A5` · `Powder #FADEDC` · `Red #F9AFBC`

### Soft (tints, used for badges/icon chips/card fills)
`Purple Soft #F0F0FF` · `Blue Soft #EEF7FF` · `Green Soft #E9F9F6` · `Lime Soft #F2FCD9` · `Powder Soft #FDF3F2` · `Yellow Soft #FFF2D0` · `Pink Soft #FFF1FD` · `Red Soft #FCD9DF`

**Rule:** text is always `#1D1D1D` on light backgrounds and `#FFFFFF` on the dark footer — no mid-gray body text; muted copy is `rgba(29,29,29,0.55–0.75)`, never a separate gray hex.

---

## 4. Typography

**Typeface substitution note:** the source template specifies **Uncut Sans Variable** (a paid/proprietary font) for every text preset, with **Inter** and **Caveat** also in its font inventory. Since Uncut Sans isn't freely licensable, this build uses **Inter** (variable, free, Google Fonts) as the primary typeface everywhere Uncut Sans was specified — it shares the same geometric-grotesk proportions and supports the same fine-grained weight axis. **Caveat** is kept as-is for any future hand-written accent text.

### Weight vocabulary (matches the audited presets exactly)
- Display/Heading: **500**
- Body: **375** (350 for the larger 26px body variant)
- Labels/badges: **475–550**

### Scale (desktop / tablet / phone)
| Preset | Size | Weight | Tracking | Line-height |
|---|---|---:|---|---|
| Display 1 (hero H1) | 90 / 84 / 50px | 500 | −0.05em | 1.05 / 1.05 / 1.1 |
| Heading 1 (section H2, centered) | 56 / 50 / 38px | 500 | −0.04em | 1.1 |
| Heading 2 (card/project title) | 38 / 34 / 28px | 500 | −0.03em | 1.175 |
| Heading 3 | 22px | 500 | −0.02em | 1.275 |
| Heading 4 | 20px | 500 | −0.02em | 1.3 |
| Body | 18px | 375 | 0 | 1.55 |
| Body 26 | 26 / 24 / 22px | 350 | — | 1.4 |
| Body 24 (centered lead-in copy) | 24 / 22 / 20px | 350 | — | 1.45 |
| Label | 15–19px | 475–550 | +0.02–0.04em | uppercase |
| Nav link | 18px | 525 | −0.02em | 1.25 |
| Button text | 17px | 500 | −0.02em | 1.175 |

Implemented as utility classes in `src/styles.css`: `.display-1`, `.heading-1` … `.heading-4`, `.body-text`, `.body-26`, `.body-24`, `.label`.

---

## 5. Spacing & Layout

| Rule | Value |
|---|---|
| Desktop content max-width | `1200px` |
| Tablet/phone container max-width | `1040px` |
| Horizontal gutter | `30px` |
| Section vertical padding | `160px` desktop / `140px` tablet / `100px` phone |
| Card corner radius | `20px` |
| Button corner radius | `10px` |
| Standard border | `1px solid #1D1D1D` everywhere a card/button/header needs an edge |
| Breakpoints | Desktop `≥1300px`, Tablet `810–1299px`, Phone `≤809px` |

Layout is a single vertical stack of full-bleed sections, each with its own flat background color, alternating white/tint/dark — never a boxed "card of cards" page. Content inside each section is centered to the max-width container with the `30px` gutter.

---

## 6. Buttons & CTAs

- **Primary button:** white fill, `1px` dark border, `10px` radius, **inset lower shadow** `inset 0 -5px 0 0 rgba(29,29,29,.15)` — this inset shadow is the signature Meeko button detail and is used on every button in the system.
- **Accent button:** same shape, `Yellow #FFE7A9` fill, hover → `Yellow Hover #FEDE8D`.
- **Dark button** (on the dark footer): dark-on-white or white-on-dark inverted, no inset shadow (shadow only reads on light fills).
- **Hover:** background steps to the next tone (white → Light, Yellow → Yellow Hover); transition is a spring, `duration 0.5s, bounce 0`.
- **Padding:** `16px 25px 18px` (asymmetric — 2px more on the bottom — matches the audited spec exactly).
- **Arrow buttons** (used on the Quick-Links cards): circular, `44px`, pastel fill matching the card's assigned accent color, `1px` dark border, arrow nudges right `3px` on card hover.

---

## 7. UI Components

Every component below is a direct port of a named Meeko component (see `context.md` §11–12) onto real content:

| Meeko component | This site's component | Real content used |
|---|---|---|
| `Header/Header` (sticky compress) | `Nav.jsx` | Aryan wordmark, Home/Work/Research/Contact anchors, GitHub/LinkedIn/Email icon buttons |
| `Header/Hamburger Icon` + mobile overlay | `Nav.jsx` mobile menu | same links, full-screen dark overlay, tap-to-close |
| Hero + photo bubble + floating tags | `Hero.jsx` | mascot avatar in headline, real skill/achievement floating badges |
| "My Info" 3-card row | `QuickLinks.jsx` | My Work / About Me / Get In Touch |
| `CMS/Portfolio Card` | `Portfolio.jsx` | VitalWatch, Plattr, fintrack, NexusMart — real project data, no CMS |
| "My numbers say it all" stat pills | `Stats.jsx` | LeetCode/GFG/GitHub/research/certification **real** counts (replaces fabricated "15 years experience" etc.) |
| `Process/Process Card` (numbered, colored) | `Research.jsx` | the two real research threads, numbered (01)/(02) |
| About section | `About.jsx` | real bio paragraphs + stack tags + mascot portrait |
| "From the blog" grid | `Certifications.jsx` | certifications/achievements grid (no blog content exists yet, so the *grid pattern* was reused rather than inventing blog posts) |
| Dark `Footer` + testimonial-style closing headline | `Contact.jsx` | real contact links (email/GitHub/LinkedIn), real footer line |
| `Elements/Button`, `Elements/Arrow Button`, `Elements/Tag`, `Elements/Badge` | `styles.css` utility classes | `.btn`, `.arrow-btn`, `.tag-chip`, `.pill-badge` |

Dropped entirely (no equivalent real content, not rebuilt): testimonials carousel, `/blog` CMS detail pages, `/projects-2` alt listing, 404 page, multi-page routing (the source template's `/projects`, `/blog`, `/contact` routes are collapsed into anchor-scrolled sections of one page, matching this repo's original single-page architecture).

---

## 8. Section Patterns

Top-to-bottom section order, each a full-bleed block with its own background:

1. **Hero** — Main Blue wash background, centered headline with inline avatar, floating skill badges, dual CTA.
2. **Quick Links** — white background, 3-card row pulled up to overlap the hero's bottom edge (`margin-top: -70px`).
3. **Portfolio ("Selected work")** — white background, alternating left/right image+copy cards.
4. **Stats ("My numbers say it all")** — Purple background, top-bordered, pill stat row.
5. **Research (Process)** — Purple Soft background, top-bordered, two numbered cards side by side.
6. **About** — Light background, top-bordered, copy + mascot portrait.
7. **Certifications** — Light background, responsive card grid.
8. **Contact / Footer** — Dark `#1D1D1D` background, centered closing headline, contact links, legal line.

Every section transition uses a `1px solid #1D1D1D` top border where the spec calls for one (Stats, Research, About) — this is what gives the flat color blocks a "cut paper" edge instead of a soft gradient blend.

---

## 9. Imagery & Visual Style

- **No stock photography, no fake screenshots.** Where the source template shows a browser mockup or product screenshot, this build shows a flat-colored placeholder block with the project's two-letter initials — an intentional, honest stand-in until real case-study screens exist (see `projects.note` in `content.js`).
- **The mascot illustration is the only "photography"** in the system — a warm, approachable 3D-cartoon rendering, always on a transparent/white background, used at three sizes: hero avatar (small circle), About/Research portrait (medium square card), Contact portrait (small circle on dark).
- Cards never use drop shadows for depth — depth comes from the `1px` dark border + flat radius only, keeping the whole page feeling like layered paper rather than glassy UI.

---

## 10. Icons & Illustrations

- **Icon style:** single-stroke (`1.6px`), no fill, `currentColor`, rounded caps/joins — see `src/components/icons.jsx`. This matches the audited "1px dark outline" stroke language extended to icon weight.
- **Icon set in use:** GitHub, LinkedIn, Mail (header/footer social), Browser, Notepad, Envelope (Quick Links), Arrow (buttons), Hamburger/Close (mobile nav), Spark/Pen (hero floating-badge decoration).
- **No icon library dependency** — every icon is a small hand-written inline SVG component, kept intentionally minimal rather than pulling in a full icon set, so the visual weight stays consistent with the rest of the stroke language.

---

## 11. Motion & Animation

All timings are taken directly from the audit (`context.md` §15) and implemented with Framer Motion:

| Pattern | Spec | Where used |
|---|---|---|
| Standard reveal | `opacity 0→1`, `y 20→0`, spring `duration 1.2s, bounce .2`, once-only | Every section heading and card, via the shared `<Reveal>` wrapper (`src/components/Reveal.jsx`) |
| Header sticky compression | spring `duration 0.8s, bounce .2` | `Nav.jsx` — header padding/position tightens on scroll |
| Button hover | spring `duration .5s, bounce 0` | `.btn`, `.arrow-btn` background transitions |
| Mobile menu open/close | spring `duration 0.8s, bounce .2` + overlay fade | `Nav.jsx` |
| Hero entrance | staggered `opacity/y` fade, `delay 0 / 0.1 / 0.2` | `Hero.jsx` badge → headline → sub → CTAs |

**Rule:** reveals never replay once triggered (`viewport={{ once: true }}`) — matches the audited "replay: false" behavior exactly, so scrolling back up never re-triggers a fade-in.

---

## 12. Responsive Design

- **Breakpoints:** Desktop `≥1300px` / Tablet `810–1299px` / Phone `≤809px`, applied via `min-width` media queries on top of a mobile-first base in `styles.css`.
- **Header:** full nav + social icons ≥810px; collapses to a hamburger + full-screen overlay menu below that.
- **Portfolio cards:** horizontal image+copy layout ≥810px; stacks vertically (image on top) below that.
- **Quick Links / Certifications grids:** 1 column on phone → 2–3 columns as width increases.
- **Type scale:** every heading preset has an explicit desktop/tablet/phone size (see §4) rather than relying on `clamp()` guesswork, matching the audit's fixed-breakpoint approach.
- **Floating hero badges:** hidden below `900px` (they have no room to float without colliding with the headline at narrow widths) — a deliberate simplification versus the source template's absolute positioning, since this site has no design tool to hand-place them per breakpoint.
