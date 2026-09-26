# Meeko Portfolio (Framer) — Section-by-Section Animation Specification

This specification provides a complete, section-segregated breakdown of all animations, transitions, scroll behaviors, and micro-interactions across every page section of the **Meeko Portfolio**, referenced directly from [`context.md`](file:///d:/portfolio/context.md).

---

## Quick Section Index
- [1. Header & Navigation (Global)](#1-header--navigation-global)
- [2. Hero Section](#2-hero-section)
- [3. My Info & Fact Cards Section](#3-my-info--fact-cards-section)
- [4. Portfolio / Featured Work Section](#4-portfolio--featured-work-section)
- [5. Testimonials & Carousel Section](#5-testimonials--carousel-section)
- [6. Working Process Section](#6-working-process-section)
- [7. About & Skills Section (Progress Bar)](#7-about--skills-section-progress-bar)
- [8. Blog / Journal Section](#8-blog--journal-section)
- [9. Contact Section & Interactive Form](#9-contact-section--interactive-form)
- [10. Footer Section](#10-footer-section)
- [11. Reusable React / Framer Motion Code Library](#11-reusable-react--framer-motion-code-library)

---

## 1. Header & Navigation (Global)

### A. Desktop Header Compression (`Header 1` → `Header 1 Sticky`)
- **Trigger**: Scroll target crossing `120px` threshold (detected via `#navigation-scroll` top anchor).
- **Behavior**:
  - `Header 1`: Top padding `40px`, total height `~116px`.
  - `Header 1 Sticky`: Top padding `20px`, total height `~96px`.
  - `Header 2 (Alt)`: Total height compresses from `96px` to `80px`.
- **Transition Spec**:
  ```typescript
  transition: { type: "spring", duration: 0.8, bounce: 0.2 }
  ```

### B. Mobile Menu Drawer & Dark Overlay
- **Trigger**: Click on `Header/Hamburger Icon`.
- **Backdrop Overlay Animation**:
  - Initial: `opacity: 0`, `pointer-events: none`
  - Open: `opacity: 0.6`, full viewport background `rgba(0,0,0,0.6)`
  - Interaction: Tapping the overlay closes the drawer.
- **Drawer Slide Animation**:
  - Initial: `translateY("-100%")`, `opacity: 0`
  - Open: `translateY("0%")`, `opacity: 1`
  - Transition Spec: `spring(duration: 0.8s, bounce: 0.2)`.

---

## 2. Hero Section

### A. Entrance & Staggered Component Sequence
- **Target Elements**: Floating Left Badge, Floating Right Badge, Status Badge Pill, Main Display Headline, body intro paragraph, CTA action buttons, and QuickLinks Hero Cards.
- **Uniform Motion Spec**: All hero badges and cards share the **exact same uniform spring animation** (`initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `spring(duration: 0.8s, bounce: 0.2)`) with sequential staggered delays:
  1. **Floating Left Badge**: `y: 20px → 0px`, `opacity: 0 → 1` (Delay `0.05s`)
  2. **Floating Right Badge**: `y: 20px → 0px`, `opacity: 0 → 1` (Delay `0.15s`)
  3. **Status Badge**: `y: 20px → 0px`, `opacity: 0 → 1` (Delay `0.0s`)
  4. **Display Headline (Word-by-Word Masked Reveal)**: Words animate sequentially (Stagger `0.06s`)
  5. **Body Paragraph**: `y: 20px → 0px`, `opacity: 0 → 1` (Delay `0.4s`)
  6. **CTA Buttons**: `y: 20px → 0px`, `opacity: 0 → 1` (Delay `0.5s`)
  7. **Hero QuickLinks Cards (3 Cards)**: `y: 20px → 0px`, `opacity: 0 → 1` (Stagger `0.1s` per card)

---

### B. Word-by-Word / Line-by-Line Staggered Text Reveal (Masked Rising Text)
Instead of the headline fading in all at once as a block, the text **appears word-by-word / line-by-line in a sequential fluid motion**.

#### Mechanics:
- **Masking Container**: Each word or line is wrapped inside a span with `overflow: hidden` and `display: inline-block`.
- **Initial Hidden Position**: Each word starts pushed down out of view below its clipping mask (`translateY(100%)`, `opacity: 0`).
- **Sequential Motion**: Words slide up one after another (`translateY(0%)`, `opacity: 1`) using Framer Motion's `staggerChildren` property.
- **Stagger Timing**: `0.05s` – `0.08s` delay between consecutive words.

#### React / Framer Motion Implementation Code:
```tsx
import { motion } from "framer-motion";

const headlineText = "Multidisciplinary designer & creative blogger based in Los Angeles.";

// Parent Container Variant (Controls Staggering)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06, // 60ms delay between each word
      delayChildren: 0.1     // Starts 100ms after hero mounts
    }
  }
};

// Child Word Variant (Masked Rise Motion)
const wordVariants = {
  hidden: {
    y: "100%",      // Pushed out of view below clipping mask
    opacity: 0
  },
  visible: {
    y: "0%",        // Slides smoothly into view
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
      bounce: 0.15
    }
  }
};

export const HeroHeadline = () => {
  const words = headlineText.split(" ");

  return (
    <motion.h1
      className="text-5xl font-bold leading-tight"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-3 vertical-bottom">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
};
```

---

### C. Hero CTA Button Micro-Interactions (`Elements/Button`)
- **Base Style**: Background White (`#FFFFFF`), Border `1px solid #1D1D1D`, Radius `10px`, Inset shadow `inset 0px -5px 0px 0px rgba(29, 29, 29, 0.15)`.
- **Hover Behavior**:
  - Background fill shifts from White (`#FFFFFF`) → Light (`#F7F7F7`).
  - **Text-Slide Mechanic**: Button text container has a clipped `20px` overflow window. On hover, current label slides up (`translateY(-100%)`) while an exact clone slides in from below (`translateY(0)`).
- **Spring Transition**: `duration: 0.5s`, `bounce: 0`.

---

### D. Responsive Breakpoint Reflow Physics
- **Home Breakpoint Motion**: Uses physics-based reflow when resizing between desktop (`1300px`), tablet (`810px`), and mobile (`390px`).
- **Physics Values**: `stiffness: 500, damping: 60, mass: 1`.

---

## 3. My Info & Fact Cards Section

### A. Section Reflow & Background Shift
- **Background Fill**: Soft blue/purple `#A7C1FA` with `1px` dark bottom border.
- **Responsive Background Height Shift**:
  - Desktop (`1100px` 3-column grid): Height `50%`
  - Tablet (`810px` 2-column grid): Height `25%`
  - Phone (`390px` 1-column stack): Height `15%`

### B. Fact Card Hover Micro-Interactions (`Fact/Fact`)
- **Default State**: Background pastel fill, dark border `1px`, radius `20px`.
- **Hover State**:
  - Icon/Number rotation: Subtly tilts (`rotate(3deg)` to `5deg`).
  - Background fill: Transitions to assigned `hoverColor` (e.g. `#FEDE8D` Yellow Hover, `#C8F0E8` Green Hover).
- **Transition Easing**: `tween 0.44, 0, 0.56, 1` over `0.25s`.

---

## 4. Portfolio / Featured Work Section

### A. Scroll-Driven Stacked Sticky Card Deck (Signature Animation)
- **Behavior**: As the user scrolls down through the project cards (*The Big Shake*, *Transparent Things*, *Phantom Limb*, *Heat Lightning*), each card pins to `position: sticky; top: 100px`.
- **Stacking Physics**:
  - As card `N+1` scrolls over card `N`, card `N` subtly scales down (`1.0 → 0.96`), shifts upward (`translateY(-20px)`), and dims `opacity: 1.0 → 0.8`.
- **Code Implementation**:
  ```tsx
  import { motion, useScroll, useTransform } from "framer-motion";
  import { useRef } from "react";

  export const StackedProjectCard = ({ index, totalCards, children }) => {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "start start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (totalCards - index) * 0.04]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

    return (
      <div ref={cardRef} className="sticky top-[100px] mb-10">
        <motion.div style={{ scale, opacity }} className="bg-white border border-[#1D1D1D] rounded-[20px] p-8">
          {children}
        </motion.div>
      </div>
    );
  };
  ```

### B. Project Card Image & Cursor Hover Interaction (`CMS/Portfolio Card`)
- **Image Hover Zoom**: Inner thumbnail image scales up (`scale: 1.0 → 1.04`) with `transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)`.
- **Custom Cursor Swap**: Cursor switches from `Default` arrow indicator to `Read More` custom cursor pill when hovering over the card image container.

---

## 5. Testimonials & Carousel Section

### A. Viewport In-View Reveal
- **Initial**: `opacity: 0`, `y: 20px`
- **In-View**: `opacity: 1`, `y: 0px`
- **Transition**: `spring(duration: 1.2s, bounce: 0.2, delay: 0.2s)` with `replay: false`.

### B. Testimonial Carousel Switcher (`Testimonial/Testimonial Carousel`)
- **States / Variants**: `First`, `Second`, `Third` (Switching quote text, author name, role, and avatar image).
- **Slide / Cross-Fade Transition**:
  - Text and image transition smoothly between variants.
  - **Transition Spec**: `spring(duration: 0.8s, bounce: 0.0)`.

---

## 6. Working Process Section

### A. Background & Section Setup
- **Background**: Soft Purple `#E3E3FF` with `1px` dark top border.
- **Section Padding**: `160px` desktop / `140px` tablet / `100px` mobile.

### B. Staggered Process Card Entrance (`Process/Process Card`)
- **Process Steps (01 to 04)**:
  - Step 01 (*Problem Framing*): Delay `0.1s`
  - Step 02 (*Shaping the Idea*): Delay `0.2s`
  - Step 03 (*Refining Details*): Delay `0.3s`
  - Step 04 (*Polishing Outcome*): Delay `0.4s`
- **Hover Micro-Interaction**: Hovering over a process card triggers icon rotation (`rotate(6deg)`) and icon stroke width emphasis.

---

## 7. About & Skills Section (Progress Bar)

### A. Section Entrance
- **Background**: Light `#F7F7F7` with `1px` dark top and bottom borders.
- **In-View Reveal**: `opacity: 0 → 1`, `y: 20px → 0px`, spring `1.2s`, `bounce: 0.2`.

### B. Skill Progress Bar Animation (`Workshop/LinearProgressBar.tsx`)
- **Gating Mechanism**: Uses `IntersectionObserver` with a `0.2` threshold to delay animating until the component is visible in the viewport.
- **State Update**: Uses React `startTransition` to calculate clamped value (`0–100`).
- **Progress Fill Animation**:
  ```css
  .progress-bar-fill {
    height: 100%;
    background-color: var(--fill-color);
    border-radius: var(--border-radius);
    transition: width var(--animation-duration, 1s) ease-out;
  }
  ```
- **Value Counter**: Displays `{clampedValue}%` text, rendering an edge divider line while animating between `0%` and `100%`.

---

## 8. Blog / Journal Section

### A. Blog Grid Item Animations (`CMS/Blog Item`)
- **Desktop Grid Layout**: `500px` vertical card or `500×195px` horizontal grid item.
- **In-View Reveal**: `opacity: 0 → 1`, `y: 20px → 0px`, `spring(duration: 1.2s, bounce: 0.2, delay: 0.1s)`.
- **Card Hover Mechanics**:
  - Border color shift.
  - Image scale (`scale(1.03)` over `0.4s ease`).
  - Title text color transition to main dark (`#1D1D1D`).

---

## 9. Contact Section & Interactive Form

### A. Desktop Hero Decorative Asset Reveals (Desktop Only `≥1320px`)
- **Rainbow Asset**: Absolute position (`left: 68px`, `bottom: 48px`), rotation `-35deg`, size `107×76px`.
  - **Reveal Spec**: `opacity: 0 → 1`, `scale: 0.95 → 1.0`, spring `1.2s`, `bounce: 0.2`, **Delay: 0.5s**.
- **Paper Plane Asset**: Absolute position (`right: 48px`, `top: 31px`), size `133×80px`.
  - **Reveal Spec**: `opacity: 0 → 1`, `scale: 0.95 → 1.0`, spring `1.2s`, `bounce: 0.2`, **Delay: 0.8s**.

### B. Form Card Reveal
- **In-View Reveal**: `opacity: 0 → 1`, `y: 20px → 0px`, spring `1.2s`, `bounce: 0.2`, **Delay: 0.3s**.

### C. Submit Button State Machine (`Elements/Submit Button`)
```mermaid
stateDiagram-v2
    [*] --> Default State
    Default State --> Hover State : Mouse Over (Text Slide + Light Fill)
    Default State --> Loading State : Form Submission Triggered
    Loading State --> Success State : API Resolution
    Loading State --> Error State : API Failure (Red Fill #FABFC9)
    Loading State --> Disabled State : Inactive / Processing (Opacity 0.5)
```

- **Loading State**: Hides text label; displays `20px` masked SVG rotating spinner.
- **Spinner Reveal Animation**: `opacity: 0 → 1` via `tween(0.3s, cubic-bezier(0.44, 0, 0.56, 1))`.
- **Disabled State**: `opacity: 0.5`, fixed height `52px`.
- **Error State**: Fill transitions to Red (`#FABFC9`).

---

## 10. Footer Section

### A. Section Entrance
- **Background**: High-contrast Dark `#1D1D1D`.
- **In-View Reveal**: `opacity: 0 → 1`, `y: 20px → 0px`, spring `1.2s`, `bounce: 0.2`.

### B. Footer Link Hover Micro-Interactions (`Footer Link` & `Footer Nav Link`)
- **Base Color**: White (`#FFFFFF`).
- **Hover Color**: `rgba(255, 255, 255, 0.6)`.
- **Underline Behavior**: `Footer Link` adds a solid `1px` white underline with `4px` offset.
- **Transition Spec**: `tween 0.44, 0, 0.56, 1` over `0.25s`.

---

## 11. Reusable React / Framer Motion Code Library

Here is a ready-to-use module exporting animation props for all sections:

```typescript
import { Variants } from "framer-motion";

// Section 1 & 2: Hero & General Reveals
export const sectionRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0.1) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", duration: 1.2, bounce: 0.2, delay }
  })
};

// Section 4: Project Card Sticky Stack
export const projectCardStack = {
  initialScale: 1,
  targetScale: 0.96,
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
};

// Section 9: Contact Hero Decorative Assets
export const rainbowAssetVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 1.2, bounce: 0.2, delay: 0.5 }
  }
};

export const paperPlaneAssetVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 1.2, bounce: 0.2, delay: 0.8 }
  }
};
```
