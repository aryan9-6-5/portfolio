# Meeko Portfolio (Framer) — Technical Source-of-Truth Audit Specification
## 1) Audit Scope
This document is a **rebuild specification** for reproducing the audited Framer project outside Framer, based strictly on supplied audit data and one confirmed code file:
- Confirmed code file inspected: `Workshop/LinearProgressBar.tsx`
- Everything else is documented from the provided project audit dataset.
This specification is intentionally exhaustive and uses status labels for certainty.
---
## 2) Confidence Legend
| Label | Meaning |
|---|---|
| **Known (Explicit)** | Directly provided in the audit data or directly confirmed in inspected source. |
| **Known (Observed)** | Explicitly described as observed behavior/values in the audit. |
| **Inferred (Constrained)** | Narrowly inferred from naming or structure only, without inventing specifics. |
| **Unknown / Not exposed** | Not available in the audit and not safely derivable. |
---
## 3) Project Overview
### 3.1 Global Metadata
| Field | Value | Status |
|---|---|---|
| Site title | `Meeko - Creative Portfolio Template for Framer` | Known (Explicit) |
| Site description | `A clean, modern portfolio template for creatives who want their work to speak first.` | Known (Explicit) |
| Social image | `https://framerusercontent.com/images/BzRsGroDP5cGdKYfisAanhbI.jpg` | Known (Explicit) |
| Favicon | `https://framerusercontent.com/images/LD3gERQI4SYvCre1lXbjvtB5w.png` | Known (Explicit) |
| Apple touch icon | `https://framerusercontent.com/images/PvkvoQk8UaSvX7Jk2z29mDy3d4c.png` | Known (Explicit) |
### 3.2 Design Direction
| Attribute | Description | Status |
|---|---|---|
| Visual tone | Editorial creative portfolio | Known (Observed) |
| Surface treatment | Soft tinted sectional backgrounds | Known (Observed) |
| Stroke language | Very dark text and 1px dark outlines | Known (Observed) |
| Display typography | Large, centered, high-impact headlines | Known (Observed) |
| Card style | Rounded white cards | Known (Observed) |
| Button style | Pronounced inset lower shadow | Known (Observed) |
| Palette mood | Paper-like pastels | Known (Observed) |
### 3.3 Font Inventory
| Font | Usage exposure | Status |
|---|---|---|
| Inter | In inventory | Known (Explicit) |
| Uncut Sans Variable | All defined text presets use this, normal style | Known (Explicit) |
| Caveat | In inventory | Known (Explicit) |
| Inter Display | In inventory | Known (Explicit) |
Weight guidance from presets:
- Display/headings: variable `wght 500`
- Body: `wght 350` or `375`
- Labels: `wght 475–550`
Status: Known (Explicit)
---
## 4) Complete Site Map
| Route | Type | Layout Template | Breakpoints | Notes |
|---|---|---|---|---|
| `/` | Static page (Home) | Primary | `≥1300`, `810–1299.98`, `≤809.98` | Known |
| `/projects` | Listing page | Primary | `≥1320`, `810–1319.98`, `≤809.98` | Known |
| `/projects-2` | Alternate listing | Primary | `≥1320`, `810–1319.98`, `≤809.98` | Known |
| `/projects/:Projects` | CMS detail | Primary | `≥1320`, `810–1319.98`, `≤809.98` | Title metadata: `{{Title}} - Woozy`; page query variable `Title` (`title`) |
| `/blog` | Listing page | Primary | `≥1320`, `810–1319.98`, `≤809.98` | Known |
| `/blog/:Blog` | CMS detail | Primary | `≥1320`, `810–1319.98`, `≤809.98` | Title metadata: `{{Title}} - Woozy` |
| `/contact` | Static page | Primary | `≥1320`, `810–1319.98`, `≤809.98` | Known |
| `/404` | Not found | Primary | `≥1300`, `810–1299.98`, `≤809.98` | Fixed breakpoint height `1080px` |
---
## 5) Shared Templates & Global Layout System
### 5.1 Primary Layout (default; used by listed pages)
| Element | Behavior / Spec | Status |
|---|---|---|
| Root background | White | Known |
| Main structure | Vertical stack; overflow clip | Known |
| Header | Fixed; desktop uses `Header 1` transitioning to `Header 1 Sticky`; tablet/phone use `Header 1 Mobile Closed` | Known |
| Page placeholder | Route content slot | Known |
| Footer | `Footer` variants: `Default` / `Tablet` / `Phone` | Known |
| Remix button | Fixed at right `20px`, bottom `65px`, size `138×36`, hidden on phone, accepts Navigation Scroll target control | Known |
### 5.2 Secondary Layout (exists but not assigned to listed pages)
| Device | Header variant |
|---|---|
| Desktop | `Header 2` / `Header 2 Sticky` |
| Tablet/Phone | `Header 2 Mobile Closed` |
Status: Known (Explicit) for existence; usage on routed pages is **not present**.
### 5.3 Per-page shared utility structure
Every routed page includes:
1. External Smooth Scroll component (intensity `10`)
2. Hidden/absolute top anchor at `120px` with element id `navigation-scroll`
Status: Known (Explicit)
---
## 6) Responsive System
### 6.1 Primary canvas widths
| Context | Desktop | Tablet | Phone |
|---|---:|---:|---:|
| Home + 404 | 1300 | 810 | 390 |
| Listing/detail pages | 1320 | 810 | 390 |
Status: Known (Explicit/Observed)
### 6.2 Container conventions
| Rule | Value | Status |
|---|---|---|
| Most desktop content max width | `1200px` | Known |
| Tablet/phone container max width | `1040px` | Known |
| Horizontal gutters | `30px` | Known |
### 6.3 Common spacing rhythm
- Standard outer stack gap: `70px`
- Frequently used gaps: `20,25,30,35,40,50,60,70,80,90,100,120,140,160,170px`
- Typical section vertical padding:
  - Desktop: `160px`
  - Tablet: `140px`
  - Phone: `100px`
- Typical page hero paddings:
  - Desktop: `240px 30px 120px`
  - Tablet: `200px 30px 100px`
  - Phone: `180px 30px 80px`
- Typical detail wrapper verticals:
  - Desktop: `240/160`
  - Tablet: `200/140`
  - Phone: `180/100`
Status: Known (Explicit/Observed)
---
## 7) Complete Color Token Registry (Light Mode Only)
No dark-mode values are configured.
### 7.1 Base colors
| Token Name | RGB/RGBA | HEX | Status |
|---|---|---|---|
| Dark | `rgb(29,29,29)` | `#1D1D1D` | Known |
| White | `rgb(255,255,255)` | `#FFFFFF` | Known |
| Light | `rgb(247,247,247)` | `#F7F7F7` | Known |
| Purple | `rgb(227,227,255)` | `#E3E3FF` | Known |
| Blue | `rgb(227,242,255)` | `#E3F2FF` | Known |
| Pink | `rgb(255,227,251)` | `#FFE3FB` | Known |
| Yellow | `rgb(255,231,169)` | `#FFE7A9` | Known |
| Green | `rgb(219,245,240)` | `#DBF5F0` | Known |
| Lime | `rgb(233,250,192)` | `#E9FAC0` | Known |
| Powder | `rgb(251,235,234)` | `#FBEBEA` | Known |
| Red | `rgb(250,191,201)` | `#FABFC9` | Known |
| Main Blue | `rgba(10,82,240,0.36)` | n/a | Known |
### 7.2 Hover palette
| Name | Value |
|---|---|
| Blue | `#D1E8FD` |
| Green | `#C8F0E8` |
| Purple | `#D8D8FF` |
| Pink | `#F9D4F4` |
| Yellow | `#FEDE8D` |
| Lime | `#DBF2A5` |
| Powder | `#FADEDC` |
| Red | `#F9AFBC` |
Status: Known
### 7.3 Soft palette
| Name | Value |
|---|---|
| Purple Soft | `#F0F0FF` |
| Blue Soft | `#EEF7FF` |
| Green Soft | `#E9F9F6` |
| Lime Soft | `#F2FCD9` |
| Powder Soft | `#FDF3F2` |
| Yellow Soft | `#FFF2D0` |
| Pink Soft | `#FFF1FD` |
| Red Soft | `#FCD9DF` |
Status: Known
### 7.4 Observed direct-use colors
| Use | Value | Status |
|---|---|---|
| Home hero fill | `rgba(10,82,240,0.36)` | Known |
| My Info background | `rgb(167,193,250)` / `#A7C1FA` | Known (Observed) |
| Standard border | `1px solid #1D1D1D` | Known (Observed) |
---
## 8) Typography System (Complete Presets)
All listed presets use **Uncut Sans Variable**, normal style unless variant implies italic (none listed here).
### 8.1 Display / Heading presets
| Preset | Semantic | Align | Weight | Desktop | Tablet | Phone | Letter spacing | Line height | Paragraph spacing |
|---|---|---|---:|---|---|---|---|---|---|
| Display/Display 1 | h1 | left | 500 | 90px | 84px | 50px | -0.05em | 1.05em / 1.05em / 1.1em | Unknown / Not exposed |
| Heading/Heading 1 | h1 | center | 500 | 56px | 50px | 38px | -0.04em | 1.1em | 40px |
| Display/Display 2 | h1 | center | 500 | 68px | 64px | 50px | -0.04em | 1.025 / 1.025 / 1.05em | Unknown / Not exposed |
| Display/Display 3 | h2 | center | 500 | 50px | 46px | 36px | -0.04em | 1.125em | Unknown / Not exposed |
| Heading/Heading 2 | h2 | left | 500 | 38px | 34px | 28px | -0.03em | 1.175em | 40px |
| Heading/Heading 3 | h3 | center | 500 | 22px | 22px | 22px | -0.02em | 1.275em | 40px |
| Heading/Post Title | h3 | left | 500 | 25px | 24px | 22px | -0.03em | 1.25em | 40px |
| Heading/Heading 4 | h4 | left | 500 | 20px | 20px | 20px | -0.02em | 1.3em | 40px |
| Heading/Heading 5 | h5 | left | 500 | 18px | 18px | 18px | -0.02em | 1.35em | 40px |
### 8.2 Paragraph / Label / Utility presets
| Preset | Align | Weight | Desktop | Tablet | Phone | Line height | Letter spacing | Transform | Paragraph spacing |
|---|---|---:|---|---|---|---|---|---|---|
| Paragraph/Body | left | 375 | 18px | 18px | 18px | 1.55em | 0em | none | 20px |
| Paragraph/Body 26px | left | 350 | 26px | 24px | 22px | 1.4em | Unknown | none | 20px |
| Paragraph/Body 24px | center | 350 | 24px | 22px | 20px | 1.45em | Unknown | none | 20px |
| Paragraph/Testimonial Text | center | 350 | 30px | 26px | 23px | 1.35em | Unknown | none | 20px |
| Paragraph/Badge Text | start | 500 | 16px | 16px | 16px | 1em | -0.02em | none | Unknown |
| Paragraph/Nav Link | start | 525 | 18px | 18px | 18px | 1.25em | -0.02em | none | Unknown |
| Paragraph/Nav Mobile Link | start | 525 | 22px | 22px | 22px | 1.25em | -0.02em | none | Unknown |
| Paragraph/Form Label | left | 375 | 15px | 15px | 15px | 1em | Unknown | none | 20px |
| Paragraph/Label (S) | left | 475 | 15px | 15px | 15px | 1.4em | Unknown | uppercase | Unknown |
| Paragraph/Label (M) | center | 525 | 17px | 17px | 17px | 1.35em | Unknown | uppercase | Unknown |
| Paragraph/Label (L) | left | 550 | 19px | 19px | 17px | 1.35em | Unknown | uppercase | Unknown |
| Paragraph/Button Text | left | 500 | 17px | 17px | 17px | 1.175em | -0.02em | none | Unknown |
| Paragraph/Button Text (L) | left | 500 | 18px | 18px | 18px | 1.175em | -0.02em | none | Unknown |
### 8.3 Link style presets
| Preset | Base | Hover | Decoration | Transition |
|---|---|---|---|---|
| Link dark | Dark | `rgba(29,29,29,.6)` | none stated | `tween 0.44,0,0.56,1 0.25s 0s` |
| Footer Link | White | `white .6` | underline solid `1px` offset `4px` | same |
| Footer Nav Link | White | `white .6` | none stated | same |
### 8.4 Legacy duplicates
Duplicate legacy text presets with shortened names are present.
- Breakpoints/values are incomplete in supplied audit.
- Marked as: **Unknown / Not exposed** beyond confirmed existence.
---
## 9) Spacing, Radius, Border, and Shadow Rules
| Tokenized behavior | Value | Status |
|---|---|---|
| Global horizontal gutters | `30px` | Known |
| Standard card radius | `20px` | Known |
| Standard button radius | `10px` | Known |
| Standard border | `1px solid #1D1D1D` | Known |
| Button inset shadow | `inset 0px -5px 0px 0px rgba(29,29,29,.15)` | Known |
---
## 10) Page-by-Page Architecture
## 10.1 Home (`/`)
Top-level desktop sequence:
1. Smooth Scroll
2. `navigation-scroll` anchor
3. Hero
4. My Info
5. Portfolio
6. Testimonials
7. Process
8. About
9. Blog
10. Footer (inherited via template)
### Hero
- Fill: Main Blue `rgba(10,82,240,0.36)`
- Horizontal section stack
- Desktop padding: `280px 30px 160px`
- Container max: `1200`
- Central wrapper max: `750`
- Wrapper vertical gap: `40`
- Tablet: padding `220/30/120`
- Phone: becomes vertical; padding `310/30/80`; wrapper gap `30`
### My Info
- Desktop: 3-column grid, max `1100`, gap `0 × 40`, section height `340`
- Background: absolute half-height `#A7C1FA` with `1px` dark bottom border
- Tablet: 2 columns, gap `30`
- Phone: 1 column, gap `30`
- Background height: desktop `50%`, tablet `25%`, phone `15%`
### Portfolio
- Section vertical padding: `160/140/100` (desktop/tablet/phone)
- Wrapper vertical gap: `60/50/40`
- Content source: CMS cards
### Testimonials
- Section color: white
- Bottom padding: `160/140/100`
- Central max width: `850`
- Vertical gap: `60`
- In-view animation: initial `opacity 0, y 20`; spring duration `1.2s`, bounce `.2`, delay `.2`, replay false (where stated globally)
### Process
- Background: Purple `#E3E3FF`
- Top border: `1px dark`
- Padding: `160/140/100`
- Wrapper gaps: `90/80/80`
### About
- Background: Light `#F7F7F7`
- Top border: `1px dark`
- Padding top: `160/140/100`, bottom `0`
- Container: bottom dark border + matching bottom padding
- Wrapper gaps: `90/80/80`
- Target id: `about`
- Scroll margin: `40px`
### Blog section (on Home)
- Background: Light `#F7F7F7`
- Vertical padding: `160/140/100`
- Wrapper gaps: `60/50/40`
Status for all above: Known (Explicit/Observed)
---
## 10.2 Projects Listing (`/projects`)
- Hero + upper background: Powder Soft `#FDF3F2`
- Hero padding:
  - Desktop: `240/120` (with global 30px horizontal gutter convention)
  - Tablet: `200/100`
  - Phone: `180/80`
- Hero text wrapper max: `750/650/650`
- Project Wrapper:
  - Bottom padding: `160/140/100`
  - Absolute background starts at top, dark bottom border
  - Background height: `12%` desktop/tablet, `6%` phone
  - List wrapper gap: `100`
Status: Known
---
## 10.3 Projects Listing Alt (`/projects-2`)
Parallel to `/projects` with these differences:
- Soft background tone: Blue Soft `#EEF7FF`
- Wrapper background height: `8%` desktop/tablet, `6%` phone
Status: Known
---
## 10.4 Project Detail (`/projects/:Projects`)
- Wrapper padding: `240/160`, `200/140`, `180/100`
- Container max width: `1200` desktop, `1040` tablet/phone
- Main vertical gaps: `70/60/50`
Related Project block:
- Bottom padding: `160/140/100`
- Heading row gap: `40`
- Collection filter: title != current title
- Max cards: `2`
- Grid: 2 columns desktop/tablet (gaps `40/30`), 1 column phone
- Heading reveal: `opacity 0`, `y 10`, spring duration `1.2s`, bounce `.2`, delay `.1`
Status: Known
---
## 10.5 Blog Listing (`/blog`)
- Hero background: Purple `#E3E3FF`
- Hero padding: `240/120`, `200/100`, `180/80`
- Centered copy wrapper max: `800` desktop, `700` tablet/phone
- Copy stack gap: `20`
- In-view reveal: `opacity 0`, `y 20`, spring `1.2s`, bounce `.2`, delay `.1`
Blog Wrapper:
- Absolute purple background with dark border
- Height: `8%` desktop/tablet, `4%` phone
- Bottom padding: `160/140/100`
- Main max: `1040`
- Gap: `60`
Status: Known
---
## 10.6 Blog Detail (`/blog/:Blog`)
- Wrapper padding: `240/160`, `200/140`, `180/100`
- Content stack gaps: `70/60/50`
Other Posts:
- Bottom padding: `160/140/100`
- Grid: 2 columns desktop/tablet (`40/30` gaps), 1 column phone
- Collection filter: exclude current title
- Limit: `2`
- Heading reveal matches Project detail heading reveal
Status: Known
---
## 10.7 Contact (`/contact`)
Hero:
- Background: Purple `#E3E3FF`
- Padding: `240/120`, `200/100`, `180/80`
- Centered text wrapper max: `600/550/550`
- Gap: `25`
Desktop decorative assets (hidden on tablet/phone):
- Rainbow: absolute `left 68`, `bottom 48`, rotate `-35°`, size `107×76`
- Paper Plane: absolute `right 48`, `top 31`, size `133×80`
- Reveal for both: opacity/scale `.95`, spring `1.2s`, bounce `.2`, delays `.5` and `.8`
Contact Wrapper:
- Lower background purple with dark bottom border, height `30%`
Form/Contact card:
- White
- Border: `1px dark`
- Radius: `20`
- Max width: `1100`
- Padding: `100/60/40`
- Gap: `60`
- Reveal: `opacity 0`, `y 20`, spring `1.2s`, bounce `.2`, delay `.3`
FAQ:
- Bottom padding: `160/140/100`
- Wrapper gaps: `50/50/40`
Status: Known (with FAQ internals not exposed)
---
## 10.8 404 (`/404`)
- Breakpoint height fixed at `1080px`
- Main Wrapper padding:
  - Desktop: `240/30/120`
  - Tablet: `200/30/110`
  - Phone: `180/30/100`
- Centered Content Wrapper max: `550`
- Gap: `25`
Deeper decorative hierarchy:
- **Unknown / Not exposed** (present but not expanded in audit)
---
## 11) Component Inventory (Complete List)
Purpose is derived from naming + provided controls/variants only.
| Component | Likely Purpose (Constrained) | Variants / States | Inputs / Controls Exposure |
|---|---|---|---|
| Header/Nav Link | Header navigation link item | Unknown / Not exposed | Unknown / Not exposed |
| Elements/Social Icon | Social platform icon/link | Unknown / Not exposed | Unknown / Not exposed |
| Header/Header | Site header/navigation shell | 8 variants documented | Padding control default `20px 40px 0`; internal nav content truncated |
| Elements/Badge | Badge/pill label | `Badge1`, `Badge2` | `bgColor`, `text` |
| Elements/Intro Image | Intro visual media set | `Image1`, `Image2`, `Image3` | `image1`, `image2`, `image3` |
| Elements/Arrow Button | Arrow CTA button | `Blue`, `hover Blue` | `color`, `hover`, `link` |
| Services/Info Card | Service info card/link | `Default`, `Mobile` | `icon`, `title`, `text`, `color`, `hover`, `link` |
| Elements/Button | Generic link button | Default + hover behavior | `buttonText`, `link`, `color`, `hoverColor`, `padding` |
| CMS/Portfolio Card | Portfolio featured/content card | Desktop/Tablet/Phone layouts | `title`, `category`, `text`, `image`, `link`, `custom cursor` |
| Services/Service Badge | Service badge icon+text | `Default`, `hover` | `title`, `icon`, `hoverRotation`, `strokeWidth`, `color` |
| Process/Process Card | Step/process item card | `Default`, `Mobile` | `icon`, `iconColor`, `BGColor`, `step`, `title`, `text`, `gap` |
| Fact/Fact | Numeric fact card | `Default`, `hover` | `text`, `number`, `color`, `hoverRotation` |
| Elements/Feature | Feature line item | `Default`, `Icon2` | `title` |
| CMS/Blog Item | Blog list/grid card | Default, Default Phone, Grid Blog, Grid Blog Mobile | `visible`, `image`, `title`, `text`, `date`, `category`, `link`, `custom cursor` |
| Footer/Footer | Site footer shell/content | `Default`, `Tablet`, `Phone` | Internal content partially truncated |
| Elements/Circle Badge | Circular CTA badge | `Default`, `Phone`, hover variants | `color`, `hover`, `link` |
| Elements/Tag | Tag/chip text | `Default` | `text`, `color`, `fontSize`, `padding` |
| Process/Process Icon | Icon wrapper for process | `Default` | `icon`, `color` |
| Elements/Info Badge | Badge with icon | `Default` | `text`, `color`, `icon`, `iconStroke` |
| Header/Logo | Brand logo link | `Default` | `link` |
| Elements/Cursor | Custom cursor element | `Default`, `Read More` | Unknown renderer internals |
| Elements/Load More | List pagination/trigger button | `Default`, `Loading`, `Hidden`, `hover` | Trigger event control |
| Testimonial/Testimonial | Testimonial block | `Default` | `text`, `author`, `title`, `image`, `padding` |
| CMS/Portfolio Item | Portfolio item card | `Default` | `image`, `link` |
| Services/Service Tabs | Tabs container and content switching | 9 variants (3 content states × desktop/tablet/phone) | Content/state controls partly exposed |
| Services/Service Tab Button | Tab selector control | `Default`, `Active`, `Phone`, `Phone Active`, hover | `title`, `color`, `hoverColor`, `onClick` |
| Experience/Experience | Experience timeline/item | `Default`, `Tablet` | `bgColor`, `date`, `position`, `location`, `experience1`, `experience2` |
| Fact/Fact 2 | Alternate fact/stat block | `Default` | `title`, `number`, `color`, `text`, `size` |
| Testimonial/Testimonial Carousel | Sliding testimonial module | `First`, `Second`, `Third` | 3 quote/name/role/image sets |
| Services/Service Card | Service description card | `Default` | `text`, `color`, `features1..5`, `fill` |
| CMS/Portfolio Item 2 | Alternate portfolio item | `Default` | `image`, `cursor`, `link` |
| Testimonial/Testimonial Card | Testimonial card (compact) | `Default` | `text`, `authorName`, `authorRole` |
| Contact/Contact Info | Contact row, optional linked state | `No Link`, `With Link` | `icon`, `title`, `text`, `option`, `link` |
| Elements/Submit Button | Form state button | `Default`, `Loading`, `Disabled`, `Success`, `Error`, hover default | Form-related state signaling |
| Header/Hamburger Icon | Mobile menu trigger icon | `Default`, `Close` | click interaction |
| Elements/Number | Numeric label token | `Default` | `number`, `color`, `size` |
| Elements/Remix Button | Fixed remix CTA | `Default` | `link` |
---
## 12) Key Component Deep Dive
## 12.1 `Header/Header`
- Variants (8):  
  `Header 1`, `Header 1 Sticky`, `Header 2`, `Header 2 Sticky`, `Header 1 Mobile Open`, `Header 1 Mobile Closed`, `Header 2 Mobile Open`, `Header 2 Mobile Closed`
- Control: padding default `20px 40px 0`
- `Header 1`:
  - Semantic tag: `header`
  - Width `1200`
  - Top padding `40`
  - Height auto (observed ~`116`)
  - Transition spring duration `0.8s`
- `Header 1 Sticky`:
  - Top padding `20`
  - Observed height ~`96`
- `Header 2`:
  - White background
  - Dark bottom border
  - Horizontal padding `30`
  - Height `96`
- `Header 2 Sticky` height `80`
- Mobile width `810`, variant padding `20px 30px 0`
- Open mobile variants: full viewport dark overlay opacity `.6`; tapping overlay closes to `Closed`
- Closed mobile variants: overlay opacity `0`, noninteractive
- Desktop and mobile headers are fixed (`z-index 2`)
- Internal nav link labels/destinations: **Unknown / Not exposed**
Status: Known except internal nav content.
## 12.2 `Footer/Footer`
- Semantic `footer`
- Background Dark `#1D1D1D`
- Variants: `Default`, `Tablet`, `Phone`
- Top padding: `160/140/130`
- Horizontal outer padding: `30`
- Container max: `1200/1040/1040`
- Internal gap: `170/160/140`
- Internal content map: **Unknown / Not exposed**
## 12.3 `Elements/Button`
- Controls: `buttonText`, `link`, `color`, `hoverColor`, `padding`
- Defaults include:
  - text: “Button Text”
  - base fill: white
  - hover fill: Light `#F7F7F7`
  - padding: `16 25 18 25`
- Shape/style:
  - Radius `10`
  - Border `1px dark`
  - Inset lower shadow
  - Auto width/height
- Interaction:
  - Link action
  - Hover triggers vertical text-slide (nested text distribution `start → end`)
  - Fill transitions white → Light
  - Transition spring duration `.5s`, bounce `0`
## 12.4 `Elements/Submit Button`
- Variants: `Default`, `Loading`, `Disabled`, `Success`, `Error` (+ hover on default)
- Semantic tag: `button`
- Min width `170`
- Padding `16 25 18 25`
- Radius `10`, dark border, inset shadow
- Loading: hides text; shows masked spinner `20px`
- Disabled: opacity `.5`, height `52`
- Error: fill red `#FABFC9`
- Hover: Light fill + text slide
- Form target/backend wiring: **Unknown / Not exposed**
## 12.5 `Elements/Load More`
- Variants: `Default`, `Loading`, `Hidden`, hover
- Semantic tag: `button`
- Width `130`
- Padding `16/25/18`
- Radius `10`, border/shadow
- Trigger event control exists
- Loading: text hidden + masked spinner `20px`
- Spinner on-mount tween `.3s`
- Hidden: fully invisible
- Hover: Light fill + text slide
## 12.6 `Services/Service Tabs`
- 9 variants = 3 content states × desktop/tablet/phone
- Desktop:
  - Width `1200`
  - Horizontal content gap `120`
  - Padding `60`
- Tablet:
  - Width `750`
  - Vertical content gap `60`
  - Padding `40`
- Phone:
  - Width `330`
  - Outer gap `30`
  - Vertical tabs + content
  - Padding `30`
  - Gap `50`
- Content card shared style:
  - `1px` dark border
  - White fill
  - Radius `20`
- Alternate content frame hidden per mode
## 12.7 `Services/Service Tab Button`
- Controls: `title`, `color`, `hoverColor`, `onClick`
- Variants/states: desktop `Default`, `Active`; phone `Phone`, `Phone Active`; hover
- Desktop:
  - Height `56`
  - Horizontal padding `35`
  - Top + side dark borders
  - Radius `20 20 0 0`
- Phone:
  - All-around dark border
  - Full `20` radius
- Fill behavior:
  - Default = pastel fill
  - Active = white
  - Hover = `hoverColor`
- Behavior:
  - Emits click event and sets active variant internally
  - Active includes `3px` white bridging line at card boundary
  - Default uses invisible `1px` line
## 12.8 `CMS/Portfolio Card`
- Inputs: `title`, `category`, `text`, `image`, `link`, custom cursor
- Desktop:
  - Width `1200`
  - Horizontal layout
  - Gap `120`
  - Padding `60`
  - White, `1px` dark border, radius `20`
  - Content vertical gap `35`
  - Image width `600`, fit-image, `1px` dark border, radius `20`, linked cursor
- Tablet:
  - Width `750`
  - Vertical layout
  - Image first
  - Content horizontal padding `40`, bottom `50`
  - Gap `40`
- Phone:
  - Width `330`
  - Content horizontal `30`, bottom `30`
  - Gap `30`
## 12.9 `CMS/Blog Item`
- Inputs: `visible`, `image`, `title`, `text`, `date`, `category`, `link`, custom cursor
- Default:
  - Vertical card width `500`
  - White, `1px` dark border, radius `20`
  - Image `400` high; aspect `1.51`
  - Top radii
  - Inner top border; padding `35`; gap `28`
- Default Phone:
  - Width `330`
  - Padding `30`
- Grid Blog:
  - `500 × 195` horizontal
  - Image width `220`
  - Right border + left radii
  - Inner padding `30`; gap `20`
- Grid Blog Mobile:
  - Vertical
  - Image height `250`
  - Inner padding `30`; gap `20`
## 12.10 `Testimonial/Testimonial Carousel`
- Variants: `First`, `Second`, `Third`
- Controls: 3 sets of quote/name/role/image
- Width `820`, centered vertical stack
- Gap `30`, padding `5 10 10`
- Typography uses `Paragraph/Testimonial Text`
- Variant transition spring duration `.8`, bounce `0`
- Internal slide control UI/logic: **Unknown / Not exposed**
## 12.11 `Contact/Contact Info`
- Variants: `No Link`, `With Link`
- Controls: `icon`, `title`, `text`, `option`, `link`
- Layout:
  - Width `400`
  - Horizontal start alignment
  - Gap `25`
  - Icon wrapper top padding `3`
  - Text wrapper vertical gap `6`
## 12.12 `Workshop/LinearProgressBar.tsx` (confirmed source)
Source inspected directly from `Workshop/LinearProgressBar.tsx`.
Confirmed behavior:
- Component display name: `Linear Progress Bar`
- Supported layout: `any-prefer-fixed` width/height with intrinsic `320×60`
- Props/controls include:
  - `label`, `value (0–100)`, `showValue`
  - `backgroundColor`, `fillColor`, `borderColor`, `textColor`
  - `labelFont`, `valueFont` (Font controls)
  - explicit numeric `labelFontWeight`, `valueFontWeight`
  - `barHeight`, `borderRadius`, `labelSpacing`
  - `animateOnMount`, `animationDuration`, `animateWhenVisible`
- Value clamped to `[0,100]`
- In-view gating uses `IntersectionObserver` threshold `0.2`
- Uses React `startTransition` for state updates
- Progress fill animates width via CSS transition (`ease-out`) when enabled
- Optional value label rendered as `{clampedValue}%`
- Border-right divider shown on fill when between 0 and 100
Usage in this audited site: **Unknown / Not exposed**
---
## 13) Concise Spec Table for Remaining Components
Components not deeply expanded above remain constrained to exposed controls/variants only:
| Component | Variants | Inputs | Confidence |
|---|---|---|---|
| Header/Nav Link | Unknown | Unknown | Unknown / Not exposed |
| Elements/Social Icon | Unknown | Unknown | Unknown / Not exposed |
| Elements/Badge | Badge1, Badge2 | `bgColor`, `text` | Known |
| Elements/Intro Image | Image1, Image2, Image3 | 3 images | Known |
| Elements/Arrow Button | Blue, hover Blue | `color`, `hover`, `link` | Known |
| Services/Info Card | Default, Mobile | `icon`, `title`, `text`, `color`, `hover`, `link` | Known |
| Services/Service Badge | Default, hover | `title`, `icon`, `hoverRotation`, `strokeWidth`, `color` | Known |
| Fact/Fact | Default, hover | `text`, `number`, `color`, `hoverRotation` | Known |
| Elements/Feature | Default, Icon2 | `title` | Known |
| Elements/Circle Badge | Default, Phone, hover | `color`, `hover`, `link` | Known |
| Elements/Tag | Default | `text`, `color`, `fontSize`, `padding` | Known |
| Process/Process Icon | Default | `icon`, `color` | Known |
| Elements/Info Badge | Default | `text`, `color`, `icon`, `iconStroke` | Known |
| Header/Logo | Default | `link` | Known |
| Elements/Cursor | Default, Read More | renderer internals unknown | Partial |
| Testimonial/Testimonial | Default | `text`, `author`, `title`, `image`, `padding` | Known |
| CMS/Portfolio Item | Default | `image`, `link` | Known |
| Experience/Experience | Default, Tablet | `bgColor`, `date`, `position`, `location`, `experience1`, `experience2` | Known |
| Fact/Fact 2 | Default | `title`, `number`, `color`, `text`, `size` | Known |
| Services/Service Card | Default | `text`, `color`, `features1..5`, `fill` | Known |
| CMS/Portfolio Item 2 | Default | `image`, `cursor`, `link` | Known |
| Testimonial/Testimonial Card | Default | `text`, `authorName`, `authorRole` | Known |
| Header/Hamburger Icon | Default, Close | click | Known |
| Elements/Number | Default | `number`, `color`, `size` | Known |
| Elements/Remix Button | Default | `link` | Known |
---
## 14) CMS Schemas and Content Inventory
## 14.1 Projects Collection
- Item count: `6`
- Detail route: `/projects/:Projects`
### Schema
| Field | Type | Required |
|---|---|---|
| Title | string | optional |
| Headline | string | optional |
| Slug | string | required (automatic) |
| Post Image | image | optional |
| Thumbnail | image | optional |
| Client | string | optional |
| Category | string | optional |
| Role | string | optional |
| Link | URL | optional |
| Content | richtext | optional |
| Post Image 2 | image | optional |
| Title 2 | string | optional |
| Headline 2 | string | optional |
| Content 2 | richtext | optional |
| Post Image 3 | image | optional |
| Testimonial | string | optional |
| Testimonial By | string | optional |
| Testimonial By, Title | string | optional |
| Testimonial Image | image | optional |
| Post Image 4 | image | optional |
| internal id | system | required |
### Items (title/slug)
| Title | Slug |
|---|---|
| The Big Shake | `the-big-shake` |
| Transparent Things | `transparent-things` |
| Phantom Limb | `phantom-limb` |
| Heat Lightning | `heat-lightning` |
| Koolbloom | `koolbloom` |
| Mindflower | `mindflower` |
### Provided sample client/category-role strings
| Project | Sample fields |
|---|---|
| The Big Shake | Content Strategy / Brand Design, Framer |
| Transparent Things | UX & UI Design / Web Design, Typography |
| Phantom Limb | Consulting / Logo Design, Wordpress |
| Heat Lightning | Web Development / Webflow, UX Design |
| Koolbloom | Brand Design / Framer, Illustration |
| Mindflower | Creative Direction / Identity, HTML/CSS |
Asset note:
- Project images are Framer CDN assets.
- Source URLs are stored per CMS item.
- Full per-image URL inventory: **Not expanded in provided audit**.
## 14.2 Blog Collection
- Item count: `8`
- Detail route: `/blog/:Blog`
### Schema
| Field | Type | Required |
|---|---|---|
| Title | string | optional |
| Post Summary | string | optional |
| Slug | string | required |
| Main Image | image | optional |
| Category | string | optional |
| Content | richtext | optional |
| id | system | required |
### Complete content table (title/category/slug/summary)
| # | Title | Category | Slug | Summary |
|---:|---|---|---|---|
| 1 | Design choices that age well and the ones you will regret later. | Design | `design-choices-that-age-well-and-the-ones-you-will-regret-later` | Useful takeaways for product and web design work. From layout rhythm to final finishing touches. |
| 2 | Small design decisions that quietly change the entire experience. | Illustration | `small-design-decisions-that-quietly-change-the-entire-experience` | A curated mix of patterns I return to often. Use them to improve clarity, consistency, and flow. |
| 3 | Difference between what looks good and what actually works. | Framer | `difference-between-what-looks-good-and-what-actually-works` | Quick inspiration with real-world context behind it. Practical examples you can apply right away. |
| 4 | What I learned rebuilding the page more times than expected. | Framer | `what-i-learned-rebuilding-the-page-more-times-than-expected` | Clean, practical ideas for building smoother pages. Small details, better structure, and faster decisions. |
| 5 | Design systems aren’t about rules they’re about reducing noise. | Freebies | `design-systems-aren’t-about-rules-they’re-about-reducing-noise` | Design notes that focus on what actually works. Simple tweaks that make layouts feel intentional. |
| 6 | How real projects reshape your thinking more than tutorials | Design | `how-real-projects-reshape-your-thinking-more-than-tutorials` | Small frameworks that keep my process on track. Better decisions, cleaner UI, and stronger results. |
| 7 | When simplicity is intentional and when it’s just unfinished | Web Design | `when-simplicity-is-intentional-and-when-it’s-just-unfinished` | Lessons from projects, experiments, and iterations. Clear thinking first, then polished execution. |
| 8 | Why good layouts feel invisible and bad ones never shut up. | Web Design | `why-good-layouts-feel-invisible-and-bad-ones-never-shut-up` | Short insights I’ve learned while designing and shipping. Fewer mistakes and calmer workflows. |
### Blog content schema observation
Observed rich-content pattern includes:
- `h2`
- Paragraph blocks
- Embedded testimonial component
- Image media block
- Second `h2` + paragraph blocks
Repeated article h2 strings observed:
1. `How thoughtful design transforms complex ideas into meaningful, user-focused experiences.`
2. `Revolutionise your checkout with new features.`
Main image alt samples: `Blog image 1` … `Blog image 8`.
Body assets are data-driven per article/title.  
Exact per-post full richtext body and block ordering for every item: **Unknown / Not exposed**.
---
## 15) Motion, Interaction, and Scroll Behavior
### 15.1 Transition patterns
| Pattern | Value | Usage |
|---|---|---|
| Standard variant transition | `spring-duration 0.8s 0.2 0s` | Frequently repeated |
| Card interaction alt | `tween 0.44,0,0.56,1 0.5s 0s` | Some card interactions |
| Buttons | `spring-duration 0.5s 0 0s` | Button variants/hover |
| Page breakpoint transition | `spring-duration 0.4s 0.2 0s` | Standard breakpoint transitions |
| Home breakpoint spring | `physics 500 60 1 0s` | Home-specific |
| Header transition | `0.8s`, bounce `0.2` | Header variant swaps |
### 15.2 Reveal pattern
Common in-view reveal:
- threshold `0`
- initial `opacity 0`, `y 20`
- spring duration `1.2s`, bounce `0.2`
- delays observed: `.1`, `.2`, `.3`, `.5`, `.8`
- replay `false`
Heading reveal variant:
- initial `opacity 0`, `y 10`
- delay `.1`
### 15.3 Scroll and sticky behavior
- Header desktop swaps `initial → sticky` by scroll target
- Mobile drawer uses explicit open/closed variants + overlay tap-to-close
- Fixed elements: Header + Remix button
- Smooth Scroll external component active on all routes (`intensity 10`)
- No additional confirmed parallax/scroll transforms beyond above: Known (Explicit)
### 15.4 Cursor behavior
- Custom cursor controls present on portfolio/blog image/card patterns
- Local cursor component variants: `Default` / `Read More`
- Cursor rendering internals: **Unknown / Not exposed**
---
## 16) Media, Assets, and Iconography
### 16.1 Image behavior
- Framer image/style controls provide URL and alt (when available in CMS)
- Shared image preset:
  - `1px` dark border
  - radius `20px`
### 16.2 Icon sets
Project-level icon families listed:
- Social Icons
- Info Icons
- Shape Icons
- Process Icons
- Contact Icon
Exact icon catalog, naming, and per-instance mappings: **Unknown / Not exposed**
### 16.3 Video/Shaders
| Topic | Status |
|---|---|
| Video configuration | Unknown / Not exposed |
| Site shaders | No configured shaders present |
---
## 17) Forms
Known:
- Contact page includes a form/contact card module.
- Submit behavior states are represented via `Elements/Submit Button` variants: `Default`, `Loading`, `Disabled`, `Success`, `Error`.
Not exposed:
- Input field schema (all fields, names, validation)
- Submission endpoint/back-end integration
- Exact form state machine wiring
- ARIA labeling specifics
Status: Partial (Known + Unknown / Not exposed)
---
## 18) SEO and Metadata Exposure
Confirmed:
- Global site metadata (title/description/social image/favicon/apple icon)
- CMS detail title templates:
  - Projects detail: `{{Title}} - Woozy`
  - Blog detail: `{{Title}} - Woozy`
Not exposed:
- Canonical URL configuration
- Robots directives
- Structured data/schema markup
- Reduced-motion metadata/prefs
---
## 19) Accessibility Exposure
Confirmed semantic tags/components:
- `section` for major sections
- `header` in Header component
- `footer` in Footer component
- `button` for Submit and Load More
Not exposed:
- Full ARIA map
- Focus management specifics (especially mobile menu)
- Keyboard behavior contracts for all interactive controls
- Form accessibility details
- FAQ accordion ARIA implementation
---
## 20) Performance and Loading Signals
Known:
- Smooth Scroll external component is globally included per route.
- Repeated in-view animations use one-time reveal behavior (`replay false` where documented).
- Some loading states include spinner visuals (`Submit Button`, `Load More`).
Not exposed:
- Image optimization policies (beyond Framer CDN usage)
- Lazy loading configuration specifics
- Critical CSS/script strategy
- Bundle splitting and runtime hydration strategy
---
## 21) Custom Code and External Integrations
### 21.1 External components present
| Component | Usage status |
|---|---|
| Smooth Scroll | Used on each routed page (Known) |
| Arc | Available, usage Unknown / Not exposed |
| Carousel | Available, usage Unknown / Not exposed |
| Slideshow | Available, usage Unknown / Not exposed |
| FAQAccordion | Available, usage Unknown / Not exposed |
### 21.2 Framer/CMS/CDN integrations
- Framer CMS collections for Projects and Blog: confirmed
- Framer CDN assets (images and other media URLs): confirmed
- Analytics/third-party integrations beyond above: **Not confirmed**
### 21.3 Local code component
- `Workshop/LinearProgressBar.tsx` exists and is confirmed (details in §12.12).
- Whether this component is used in any routed page: **Unknown / Not exposed**.
---
## 22) Design Rules (Supported Only)
1. Use very dark (`#1D1D1D`) 1px outlines as the standard stroke language where documented.
2. Keep cards white with 20px radius and consistent border treatment.
3. Keep buttons with 10px radius and inset lower shadow.
4. Preserve large editorial typographic hierarchy with Uncut Sans Variable and specified `wght` values.
5. Preserve section color-block rhythm using the documented pastel/soft background system.
6. Preserve fixed header + fixed Remix button behavior and route-wide smooth scrolling.
Status: Known/Observed from audit only.
---
## 23) Reproduction Guideline (Audit-Constrained)
Reproduction should follow this strict order:
1. Implement route map and breakpoint ranges exactly.
2. Implement shared template structure (Primary) including fixed header/footer/remix and per-route smooth scroll + `navigation-scroll` anchor.
3. Apply exact tokens (colors, typography presets, radii, borders, shadows).
4. Build page architecture section-by-section with specified paddings/gaps/max widths.
5. Implement key components with documented variants and interactions.
6. Connect CMS schemas and lists exactly to Projects and Blog content definitions.
7. Apply motion presets/reveal timings exactly where specified.
8. Mark all unknowns explicitly as unresolved rather than inventing behavior.
No undocumented behavior should be fabricated.
---
## 24) Exact-Values Registry (Cross-Cutting)
Critical repeated values:
- Dark: `#1D1D1D`
- White: `#FFFFFF`
- Light: `#F7F7F7`
- Main blue hero fill: `rgba(10,82,240,0.36)`
- Standard border: `1px solid #1D1D1D`
- Card radius: `20px`
- Button radius: `10px`
- Button inset shadow: `inset 0 -5px 0 0 rgba(29,29,29,.15)`
- Gutters: `30px`
- Main desktop max content width: `1200px`
- Tablet/phone max container: `1040px`
- Standard outer stack gap: `70px`
- Common reveal initial: `opacity 0`, `y 20`
- Common reveal spring: `1.2s`, bounce `.2`
- Header transition: `.8s`, bounce `.2`
- Button transition: spring `.5s`, bounce `0`
---
## 25) Unknowns and Confidence Register
## 25.1 High-confidence confirmed
- Sitemap, route breakpoints, major section architecture
- Color token values
- Typography preset metrics
- Core spacing/radius/border/shadow constants
- Key component variants and many controls
- CMS schemas and listed item inventories
- Core animation timings and reveal patterns
## 25.2 Unknown / Not exposed list (non-exhaustive but comprehensive by domain)
1. Header internal nav labels/destinations and full child structure.
2. Footer internal content details and exact link map.
3. Full icon catalog and placement mapping by instance.
4. FAQ internal implementation details and ARIA contracts.
5. Contact form complete field schema, validation, submit backend.
6. Complete cursor renderer internals and global cursor orchestration.
7. 404 deeper decorative subtree exact values.
8. Full per-item project media URL list and full blog richtext body inventory.
9. Canonical/robots/structured data/reduced-motion configuration.
10. Analytics/third-party integrations beyond confirmed CMS/CDN/Smooth Scroll.
11. Usage of available external components besides Smooth Scroll.
12. Runtime usage scope of `Workshop/LinearProgressBar.tsx`.
13. Legacy duplicate text presets exact complete breakpoint maps.
---
## 26) Final Exhaustive Implementation Checklist
Use this as rebuild acceptance criteria.
- [ ] Global metadata set to exact audited values.
- [ ] Route table implemented exactly (including CMS detail paths and 404).
- [ ] Breakpoint ranges match audited ranges.
- [ ] Primary layout structure reproduced (fixed header/footer/remix; overflow clip).
- [ ] Every route includes Smooth Scroll (intensity 10) and `navigation-scroll` anchor at top 120px.
- [ ] Color tokens (base/hover/soft) implemented exactly.
- [ ] Typographic presets implemented exactly with responsive sizes/line-height/tracking.
- [ ] Link preset hover and transition behavior implemented.
- [ ] Card/button radius, border, shadow standards implemented globally.
- [ ] Home sections implemented in exact order with specified paddings/gaps/max widths/backgrounds.
- [ ] Projects page (`/projects`) background and wrapper height behavior implemented.
- [ ] Projects-2 (`/projects-2`) blue-soft variant differences implemented.
- [ ] Project detail wrapper, gaps, related-project filtering (`title != current`, max 2) implemented.
- [ ] Blog listing hero and wrapper background geometry implemented.
- [ ] Blog detail “Other Posts” filtering (`exclude current`, max 2) implemented.
- [ ] Contact hero decorations implemented desktop-only with exact positions/size/rotation/reveal delays.
- [ ] Contact form card geometry and reveal behavior implemented.
- [ ] 404 main wrapper and content wrapper dimensions implemented; deeper decorations marked unresolved until sourced.
- [ ] Header variants and sticky/mobile open-close behavior implemented.
- [ ] Footer variant paddings/max widths/gaps implemented.
- [ ] Button/Submit/Load More component state and hover mechanics implemented.
- [ ] Service Tabs and Tab Button variant/state geometry implemented.
- [ ] CMS/Portfolio Card and CMS/Blog Item responsive variants implemented.
- [ ] Testimonial Carousel 3-state model implemented with known transitions.
- [ ] Contact Info `No Link`/`With Link` variants implemented.
- [ ] Remaining components implemented at least to exposed variant/control contract.
- [ ] Projects CMS schema implemented with all fields and item slugs/titles.
- [ ] Blog CMS schema implemented with all fields and exact 8-item metadata.
- [ ] Motion presets and reveal timings match audited values.
- [ ] Unknown/not exposed domains explicitly tracked (no fabricated values).
- [ ] Confirmed custom code component (`LinearProgressBar`) documented and optionally integrated only if usage becomes known.
---
## 27) Audit Evidence Boundaries
- Authoritative source used: provided audited project data in this request.
- Additional confirmed source: `Workshop/LinearProgressBar.tsx` (inspected directly).
- No other code files were available for deeper verification.
- Any missing values are intentionally labeled **Unknown / Not exposed**.
# Reproduction Audit — Framer Portfolio/Blog
## Overview
- **Scope:** Compact audit for an existing Framer portfolio/blog site.
- **Confidence:** High for values explicitly provided; anything missing is marked **Not exposed**.
- **Shared layout:** Fixed header + page body + dark footer.
- **Breakpoints:**
  - Desktop: `>=1300` (some pages use `>=1320`)
  - Tablet: `810–1299/1319`
  - Phone: `<=809`
- **Container widths/gutters:**
  - Main content max width: `1200` desktop, `1040` tablet/phone
  - Horizontal gutters: `30px`
- **Common spacing/radius/border:**
  - Section vertical padding: `160 / 140 / 100` (desktop/tablet/phone)
  - Cards/images radius: `20px`
  - Buttons radius: `10px`
  - Borders: `1px` dark
- **Typeface:** Uncut Sans Variable
---
## Site Map
- `/` (Home)
- `/projects`
- `/projects-2`
- `/projects/:Projects`
- `/blog`
- `/blog/:Blog`
- `/contact`
- `/404`
---
## Styles
### Color Tokens
| Token | RGB |
|---|---|
| Dark | `rgb(29,29,29)` |
| White | `rgb(255,255,255)` |
| Light | `rgb(247,247,247)` |
| Purple | `rgb(227,227,255)` |
| Blue | `rgb(227,242,255)` |
| Pink | `rgb(255,227,251)` |
| Yellow | `rgb(255,231,169)` |
| Green | `rgb(219,245,240)` |
| Lime | `rgb(233,250,192)` |
| Powder | `rgb(251,235,234)` |
| Red | `rgb(250,191,201)` |
### Hover Tokens
| Token | RGB |
|---|---|
| Blue Hover | `rgb(209,232,253)` |
| Green Hover | `rgb(200,240,232)` |
| Purple Hover | `rgb(216,216,255)` |
| Pink Hover | `rgb(249,212,244)` |
| Yellow Hover | `rgb(254,222,141)` |
| Lime Hover | `rgb(219,242,165)` |
| Powder Hover | `rgb(250,222,220)` |
| Red Hover | `rgb(249,175,188)` |
### Typography
| Style | Size (D/T/P) | Weight | Tracking | Line Height (D/T/P) |
|---|---|---:|---:|---|
| Display 1 | `90 / 84 / 50px` | 500 | `-0.05em` | `1.05 / 1.05 / 1.1` |
| Display 2 | `68 / 64 / 50px` | 500 | `-0.04em` | `1.025 / 1.025 / 1.05` |
| Display 3 | `50 / 46 / 36px` | 500 | `-0.04em` | `1.125` |
| Heading 1 | `56 / 50 / 38px` | 500 | `-0.04em` | `1.1` |
| Heading 2 | `38 / 34 / 28px` | 500 | `-0.03em` | `1.175` |
| Body | `18px` | 375 | Not exposed | `1.55` |
| Body26 | `26 / 24 / 22px` | 350 | Not exposed | `1.4` |
| Testimonial | `30 / 26 / 23px` | 350 | Not exposed | `1.35` |
---
## CMS
### Projects Collection Fields
- Title
- Headline
- Slug
- Post Image
- Thumbnail
- Client
- Category
- Role
- Link
- Content
- Post Image 2
- Title 2
- Headline 2
- Content 2
- Post Image 3
- Testimonial
- Testimonial By
- Testimonial By Title
- Testimonial Image
- Post Image 4
### Blog Collection Fields
- Title
- Post Summary
- Slug
- Main Image
- Category
- Content
---
## Text Inventory
### MAIN (`/`)
- Sections:
  - Hero
  - My Info
  - Portfolio
  - Testimonials
  - Process
  - About
  - Blog
- Exact inner text: **Not exposed**
### PROJECTS (`/projects`, `/projects-2`)
- Structure:
  - Page Hero
  - Project Wrapper
- Exact hero/wrapper copy: **Not exposed**
### PROJECT DETAIL (`/projects/:Projects`)
- Known project CMS names:
  1. The Big Shake — (Brand Design, Framer; Content Strategy)
  2. Transparent Things — (Web Design, Typography; UX & UI Design)
  3. Phantom Limb — (Logo Design, Wordpress; Consulting)
  4. Heat Lightning — (Webflow, UX Design; Web Development)
  5. Koolbloom — (Framer, Illustration; Brand Design)
  6. Mindflower — (Identity, HTML/CSS; Creative Direction)
- Project detail body copy: **Not exposed**
### BLOG (`/blog`, `/blog/:Blog`)
- 1) **Design choices that age well and the ones you will regret later.**  
  Useful takeaways for product and web design work. From layout rhythm to final finishing touches.  
  Category: Design
- 2) **Small design decisions that quietly change the entire experience.**  
  A curated mix of patterns I return to often. Use them to improve clarity, consistency, and flow.  
  Category: Illustration
- 3) **Difference between what looks good and what actually works.**  
  Quick inspiration with real-world context behind it. Practical examples you can apply right away.  
  Category: Framer
- 4) **What I learned rebuilding the page more times than expected.**  
  Clean, practical ideas for building smoother pages. Small details, better structure, and faster decisions.  
  Category: Framer
- 5) **Design systems aren’t about rules they’re about reducing noise.**  
  Design notes that focus on what actually works. Simple tweaks that make layouts feel intentional.  
  Category: Freebies
- 6) **How real projects reshape your thinking more than tutorials.**  
  Small frameworks that keep my process on track. Better decisions, cleaner UI, and stronger results.  
  Category: Design
- 7) **When simplicity is intentional and when it’s just unfinished.**  
  Lessons from projects, experiments, and iterations. Clear thinking first, then polished execution.  
  Category: Web Design
- 8) **Why good layouts feel invisible and bad ones never shut up.**  
  Short insights I’ve learned while designing and shipping. Fewer mistakes and calmer workflows.  
  Category: Web Design
### CONTACT (`/contact`)
- Address label: `Address`
- Address value: `Moonshine St. 14/05, London`
- Form copy: **Not exposed**
- FAQ copy: **Not exposed**
### OTHER
- 404 copy: **Not exposed**
- Footer legal/social/link text: **Not exposed**
- Header nav labels: **Not exposed**
---
## Components
| Component |
|---|
| Header/Nav Link |
| Social Icon |
| Header |
| Badge |
| Intro Image |
| Arrow Button |
| Info Card |
| Button |
| Portfolio Card |
| Service Badge |
| Process Card |
| Fact |
| Feature |
| Blog Item |
| Footer |
| Circle Badge |
| Tag |
| Process Icon |
| Info Badge |
| Logo |
| Cursor |
| Load More |
| Testimonial |
| Portfolio Item |
| Service Tabs |
| Service Tab Button |
| Experience |
| Fact 2 |
| Testimonial Carousel |
| Service Card |
| Portfolio Item 2 |
| Testimonial Card |
| Contact Info |
| Submit Button |
| Hamburger Icon |
| Number |
| Remix Button |
### Noted Variants/States
- **Header variants:** Header1 / Header1 Sticky / Header2 / Header2 Sticky / Mobile Open / Mobile Closed
- **Footer variants:** Desktop / Tablet / Phone
- **Submit Button states:** Default / Loading / Disabled / Success / Error
---
## Animation & Interaction Inventory
- **Global reveal (on-in-view):**
  - from `opacity: 0`, `y: 20px`
  - spring duration `1.2s`, bounce `.2`
  - delay usually `.1s`
  - contact card delay `.3s`
  - replay `false`
- **Related headings reveal:** `y: 10px`, same spring, delay `.1s`
- **Header fixed:** `z-index: 2`
- **Header1 scroll-target variant:** top padding `40 -> 20` (desktop), spring duration `.8s`, bounce `.2`
- **Header2 sticky variant:** white bordered, height `96px -> 80px`
- **Mobile header open/close:** spring `.8s` / bounce `.2`
  - dark overlay `opacity .6`, `100vh`
  - tap overlay closes menu
- **Button hover:**
  - background white -> Light
  - radius `10`
  - padding `16 25 18`
  - border `1px` dark
  - inset shadow `0 -5 0 rgba(29,29,29,.15)`
  - spring `.5`
  - clipped `20px` text vertical move
- **Submit button behavior:**
  - states: default/loading/disabled/success/error
  - loading hides label + shows `20px` masked spinner
  - disabled `opacity .5` / `52px`
  - error uses red
- **Load More behavior:**
  - states: default/loading/hidden
  - same hover behavior as button
  - `20px` masked spinner
  - onMount fade tween `cubic-bezier(.44,0,.56,1)` over `.3s`
- **Service Tabs layout behavior:**
  - tab tap triggers event + active state
  - desktop: width `1200`, horizontal content, gap `120`, pad `60`
  - tablet: width `750`, vertical content, gap `60`, pad `40`
  - phone: width `330`, vertical tabs/content, pad `30`
- **Portfolio Card layout behavior:**
  - desktop: width `1200`, horizontal, gap `120`, pad `60`, image `600`
  - tablet: vertical `750`
  - phone: vertical `330`
- **Blog Item layout behavior:**
  - desktop card `500`, image `400`, pad `35`
  - phone `330`, pad `30`
  - grid horizontal `500x195`, image `220`
  - mobile grid vertical, image `250`
- **Testimonial Carousel variants:** First / Second / Third, width `820`, gap `30`, spring `.8`
- **Smooth Scroll component:** intensity `10`
- **Contact desktop decor:**
  - Rainbow + Paper Plane reveal scale `.95`
  - spring duration `1.2`, bounce `.2`
  - delays `.5` / `.8`
  - hidden tablet/phone
## Animation Recipes
1. **Standard reveal spring**
   - Initial: `opacity: 0, y: 20`
   - Animate in-view: `opacity: 1, y: 0`
   - Transition: spring `{ duration: 1.2, bounce: 0.2, delay: 0.1 }`
   - Replay: false
2. **Sticky header compression**
   - Header1: top padding `40 -> 20` (desktop)
   - Header2: height `96 -> 80`
   - Transition: spring `{ duration: 0.8, bounce: 0.2 }`
3. **Primary button hover**
   - bg: white -> light
   - preserve `border: 1px dark`, radius `10`, inset shadow
   - text slide in clipped `20px` viewport
   - transition spring `.5`
4. **Loading spinner swap (submit/load more)**
   - Hide text label
   - Show `20px` masked spinner
   - Maintain fixed control height/state-specific styles
---
## Accessibility/SEO
- **SEO title (root):** `Meeko - Creative Portfolio Template for Framer`
- **SEO description (root):** `A clean, modern portfolio template for creatives who want their work to speak first.`
- **SEO title (project/blog detail):** `{{Title}} - Woozy`
- Accessibility labels/roles/focus behavior: **Not exposed**
- Alt text policy/content: **Not exposed**
---
## Unknowns & Confidence
### Not exposed
- Exact copy for Home sections
- Full Projects hero/wrapper copy
- Project detail long-form content blocks
- Contact form labels/messages and FAQ entries
- 404 page text
- Header nav item labels
- Footer links/legal/social labels
- Exact accessibility implementation details
- Any values not explicitly listed above
### Confidence
- **High** on route map, breakpoints, sizing, tokens, typography values, CMS fields, listed component names, and motion specs provided in source brief.
---
## Implementation checklist
- [ ] Configure route structure exactly as listed.
- [ ] Apply shared primary layout (fixed header, body, dark footer).
- [ ] Implement breakpoint logic (`>=1300/1320`, `810–1299/1319`, `<=809`).
- [ ] Enforce container widths (`1200` desktop, `1040` tablet/phone) + `30px` gutters.
- [ ] Apply spacing/radius/border system (`160/140/100`, `20`, `10`, `1px dark`).
- [ ] Install all color + hover tokens exactly as specified.
- [ ] Set typography scale and metrics exactly as specified.
- [ ] Build CMS models with exact field names for Projects and Blog.
- [ ] Seed/verify project names and blog title/summary/category inventory.
- [ ] Implement component inventory and required variant/state sets.
- [ ] Reproduce motion recipes (reveal, sticky header, button, loading states, overlays).
- [ ] Configure SEO title/description templates.
- [ ] Fill all **Not exposed** copy/content from source files or stakeholder inputs before final handoff.