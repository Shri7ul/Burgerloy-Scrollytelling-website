# 🍔 Burgerloy — Luxury Burger Scrollytelling Experience

**Burgerloy** is a cinematic, scroll-driven website experiment built to explore **high-end visual storytelling**, **luxury typography**, and **performance-focused animation** on the web.

This project blends **image-sequence animation**, **gold-on-dark editorial typography**, and **scroll-synced motion** to simulate a premium $1000 burger brand experience.

> ⚠️ This is a **practice & exploration project** — built for visual impact, not client delivery.

---

## ✨ Key Features

- 🎥 **Scroll-Driven Image Sequences**  
  Frame-by-frame burger animations synced perfectly with scroll

- 🥇 **Luxury Typography System**  
  Metallic gold, warm ivory, stone gray — readable even on chaotic visuals

- 🌪️ **Cinematic Storytelling Flow**
  - Arrival
  - Engineered Flavor
  - Crunch / Balance / Precision
  - Hero Brand Reveal
  - Premium CTA

- 🧠 **High Readability on Busy Backgrounds**
  - Glow + shadow + subtle stroke
  - Radial vignette backplates behind text

- ⚡ **Performance-First**
  - No heavy 3D libraries
  - Optimized image sequences (WebP)
  - Smooth on desktop & mobile

---

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **WebP Image Sequences**
- **Netlify Deployment**

---

## 📁 Project Structure

```

public/
├─ animation1/        # Burger storm image sequence (WebP frames)
├─ animation2/        # Assembly / hero sequence
├─ images/
│   └─ logo.png       # Burgerloy mini logo
src/
├─ app/
│   ├─ page.tsx
│   ├─ globals.css
├─ components/
│   ├─ Overlay.tsx    # All scroll text + typography logic
│   ├─ FrameSequence.tsx
│   └─ Section.tsx

````

---

## 🎨 Typography & Color System

| Purpose | Color |
|------|------|
| Brand / Hero | `#D4AF37` (Metallic Gold) |
| Headlines | `#FFF1E3` (Warm Ivory) |
| Supporting | `#E2D6C7` (Stone) |
| Micro Text | `#B7B0A7` (Muted Gray) |

**Rules**
- No pure white
- No thin fonts
- Always shadow + glow
- Big text > animation (never the opposite)

---

## 🧪 Animations Philosophy

- **Scroll = timeline**
- No autoplay videos
- Every motion responds to user intent
- Scale + blur + opacity used sparingly for “weight”

---

## 🚀 Getting Started

```bash
npm install
npm run dev
````

Build check:

```bash
npm run build
```

---

## 🌐 Deployment

Hosted on **Netlify** using static build output.

```bash
npm run build
```

Deploy the generated output folder.

---

## 🌐 Live Demo
👉 **[View Live Website](https://burgerloy.netlify.app/)**


---

## 🧠 Why This Project?

This project was built to practice:

* High-end brand storytelling
* Scroll-based narrative design
* Luxury UI/UX decision making
* Motion + typography harmony

---

## 👤 Author

Built with obsession by **Shriful Islam** (InHuman)  
Focused on **AI • Automation • Creative Engineering**

---

## 📄 License

MIT — use it, remix it, learn from it.

---

🔥 *“Luxury is clarity, not noise.”*