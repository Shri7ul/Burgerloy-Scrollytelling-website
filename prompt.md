# MASTER PROMPT: "BURGERLOY" - Ultra-Premium Scrollytelling Experience

**Role**: You are an Expert Creative Technologist (Awwwards/FWA level) specialized in high-performance React visuals and luxury web design.

**Objective**: Build a "Scrollytelling" Landing Page for a high-end burger brand ("BURGERLOY"). The core experience is scrubbing through a cinematic 3D image sequence (assembling a burger) significantly tied to scroll progress, overlaid with ultra-luxury typography.

**Input Assets**:
- You have two folders in the root: `animation1` (The Storm/Chaos) and `animation2` (The Assembly/Hero).
- These contain numbered images (e.g., `0001.png`...).

**Tech Stack**:
- **Framework**: Next.js 14+ (App Router), TypeScript.
- **Styling**: Tailwind CSS.
- **Motion**: Framer Motion (for text/UI), HTML5 Canvas (for image sequence).
- **Smooth Scroll**: `@studio-freight/lenis` (Mandatory for luxury feel).

---

## EXECUTION STEPS

### 1. Asset Pipeline (The Foundation)
First, you must unify the disparate image folders into a single optimized sequence.
- **Action**: Create a script or manual step to verify `animation1` and `animation2`.
- **Processing**:
    1.  Rename/Sequence all images from `animation1` followed by `animation2` into a single folder: `public/frames/`.
    2.  Naming format: `0001.webp`, `0002.webp`, etc. (Pad with zeros).
    3.  **Optimization**: If possible, suggest or run `ffmpeg` to resize images to `1920w` and convert to `WebP` (Quality 75) for performance.

### 2. Core Scrollytelling Engine (`ScrollyTelling.tsx`)
Build a reusable component that handles the heavy lifting.
- **Canvas-based**: Use `<canvas>` for rendering (not thousands of `<img>` tags).
- **Logic**:
    -   Load images progressively (Preload batches).
    -   Use `requestAnimationFrame` for smooth rendering.
    -   Map `scrollY` (0 to max scroll) to `frameIndex` (0 to totalFrames).
    -   **Fit Logic**: Use `object-fit: contain` logic within the canvas (draw image centered, aspect ratio preserved, full viewport).
-   **Performance**: Ensure no flickering. images must be cached.

### 3. Ultra-Premium "Editorial" Overlay (`Overlay.tsx`)
This is the most critical visual component. It must look like a high-end fashion magazine, not a typical startup website.

**Design Rules (Strict):**
1.  **Palette**:
    -   **Gold**: `#D4AF37` (Brand moments only).
    -   **Ivory**: `#F2E8DC` (Headlines).
    -   **Stone**: `#CFC7BC` (Supporting).
    -   **Gray**: `#A8A29E` (Micro labels).
    -   **NEVER use pure white (#FFFFFF).**
2.  **Typography**:
    -   **Weights**: Heavy only (700-900). No thin fonts.
    -   **Sizing**: Massive responsiveness. Use `clamp(3rem, 8vw, 10rem)` for hero text.
    -   **Fonts**: `Playfair Display` (Serif/Display) + `Inter` (Sans) or `JetBrains Mono` (Micro).
3.  **Readability System** (Compulsory on busy backgrounds):
    -   Add a **Radial Dark Backplate** behind *every* text group.
    -   CSS: `background: radial-gradient(circle at center, rgba(0,0,0,0.6), transparent 70%);`
    -   Add **Blur** to the backplate (`backdrop-filter` or SVG blur).
    -   **Shadows**: Multi-layer shadows on text for depth.
4.  **Layout**:
    -   **Centered & Balanced**: No "split screen" where one side is empty.
    -   If a label is on the left, balance it with a badge/line on the right.
    -   Center the main content (Hero/Headlines) for maximum impact.

**Scene Script (Copy & Flow):**
-   **Scene 1 (The Storm)**: Micro: "HANDCRAFTED LUXURY" | Hero: "BURGERLOY" (Gold, Massive) | Sub: "Crafted from chaos."
-   **Scene 2 (Engineered)**: Headline: "ENGINEERED FLAVOR" (Gold highlight) | Divider: Gold Line.
-   **Scene 3 (The Trio)**: Stacked, Centered, Massive. "CRUNCH" (Ivory) -> "BALANCE" (Gold) -> "PRECISION" (Ivory).
-   **Scene 4 (Hero)**: "THIS IS BURGERLOY".
-   **Scene 5 (CTA)**: "ORDER UP". Button: Gold block, black text.

### 4. Cinematic Motion
-   **Text Entrance**: Do not just "fade in". Use a **"Heavy Reveal"**.
    -   Scale: Start at `1.15` -> animate to `1.0`.
    -   Blur: Start at `10px` -> animate to `0px`.
    -   Opacity: Start at `0` -> animate to `1`.
    -   Ease: Slow, weighty curve (e.g., `[0.16, 1, 0.3, 1]`).
-   **Parallax**: Slight vertical drift for text vs. background to separate layers.

### 5. Deployment Setup
-   Configure `next.config.js` for Static Export (`output: 'export'`) to ensure `out/` folder generation for Netlify/Vercel.
-   Ensure `images.unoptimized = true`.

---

**Implementation Prompt for AI**:
"Initialize the project, process the `animation` folders into `public/frames`, and build the `ScrollyTelling` engine and `Overlay` component following the Strict Luxury Design Rules above. The result must be a production-ready, highly optimized, cinematic website."
