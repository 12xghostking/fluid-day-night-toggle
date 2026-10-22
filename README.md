# Fluid Sun-to-Moon Day/Night Toggle Switch ☀️ ⇄ 🌙

A physics-inspired, fluid Day/Night mode toggle engineered with 3D inset cavity depth, celestial morphing, dynamic eclipse rim lighting, and atmospheric sky transitions based on the visual specifications.

![Toggle Preview](preview.png)

---

## ✨ Features & Visual Physics

1. **Sun-to-Moon Celestial Morphing**:
   - **Sun (Day Mode)**: Warm golden-amber sphere with 3D radial lighting, soft drop glow, and layered cumulus clouds drifting at the bottom/right.
   - **Moon (Night Mode)**: Silver-slate lunar disc with 3 distinct craters precisely positioned with interior cavity shadows.
   - **Signature Golden Crescent Rim**: When transitioning to night, the moon slides into place while revealing the sun's warm golden rim along the left edge, exactly as shown in the reference screenshots.

2. **Kinetic Squash & Stretch**:
   - The thumb elongates horizontally during transit (`scaleX(1.18) scaleY(0.88)`) and springs back into a perfect sphere upon reaching its destination, giving it authentic physical weight and inertia.

3. **3D Inset Cavity Bezel**:
   - Multi-layer `box-shadow` depth creating a physical debossed slot stamped into the surface with top-left ambient shadows and bottom-right specular highlights.

4. **Atmospheric Environment**:
   - **Day Mode**: Layered cumulus clouds hugging the bottom-right rim with subtle floating ambient motion.
   - **Night Mode**: Cross-fades into midnight navy with 3 four-pointed sparkle stars (✦) and 8 dot stars with gentle twinkling animations.
   - When switching, clouds smoothly sink downwards (`translateY(115%)`) while stars gracefully blossom into view.

5. **Production Ready & Accessible**:
   - Semantic HTML with WAI-ARIA `role="switch"` and `aria-checked`.
   - Full keyboard accessibility (<kbd>Tab</kbd> to focus, <kbd>Space</kbd> or <kbd>Enter</kbd> to toggle).
   - Zero-dependency: pure CSS transitions with hardware accelerated transforms.
   - Includes standalone **React** and **Vue 3** components.
   - Interactive Web Audio API sound effects (synthesized warm sunrise chime & dreamy night chime).

---

## 🚀 Quick Start (Open in Browser)

Simply double click or open `index.html` in any browser:
```bash
# In powershell:
start c:\Users\sirki\projects\fluid-day-night-toggle\index.html
```

---

## 📦 Integration

### 1. Pure HTML & CSS (Zero Dependencies)

Copy the toggle HTML into your page:
```html
<label class="day-night-toggle" for="theme-switch">
  <input type="checkbox" id="theme-switch" class="toggle-input" role="switch" aria-label="Toggle theme" />
  
  <div class="toggle-track">
    <!-- Day Sky & Clouds -->
    <div class="sky sky-day">
      <svg class="clouds-svg" viewBox="0 0 240 100" preserveAspectRatio="none">
        <path fill="#ffffff" d="M 45 100 L 240 100 L 240 54 C 232 46, 218 48, 210 59 C 202 50, 186 49, 176 60 C 166 52, 148 54, 140 65 C 130 58, 114 62, 108 72 C 98 66, 84 70, 78 80 C 68 76, 54 84, 48 94 Z" />
      </svg>
    </div>

    <!-- Night Sky & Stars -->
    <div class="sky sky-night">
      <div class="stars-layer">
        <svg class="star star-sparkle star-1" viewBox="0 0 24 24"><path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" fill="#ffffff" /></svg>
        <svg class="star star-sparkle star-2" viewBox="0 0 24 24"><path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" fill="#ffffff" /></svg>
        <svg class="star star-sparkle star-3" viewBox="0 0 24 24"><path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" fill="#ffffff" /></svg>
        <span class="star star-dot dot-1"></span>
        <span class="star star-dot dot-2"></span>
        <span class="star star-dot dot-3"></span>
      </div>
    </div>

    <!-- Cutout Inset Cavity -->
    <div class="cavity-overlay"></div>

    <!-- The Celestial Knob -->
    <div class="toggle-thumb">
      <div class="sun-body"></div>
      <div class="moon-body">
        <div class="crater crater-1"></div>
        <div class="crater crater-2"></div>
        <div class="crater crater-3"></div>
      </div>
    </div>
  </div>
</label>
```
Include `DayNightToggle.css`.

---

### 2. React / Next.js

```jsx
import React, { useState } from 'react';
import { DayNightToggle } from './DayNightToggle';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? 'dark-theme' : 'light-theme'}>
      <DayNightToggle 
        checked={isDark} 
        onChange={(e) => setIsDark(e.target.checked)} 
        size="md" // 'sm' | 'md' | 'lg'
      />
    </div>
  );
}
```

---

### 3. Vue 3 (Composition API)

```vue
<script setup>
import { ref } from 'vue';
import DayNightToggle from './DayNightToggle.vue';

const isDarkMode = ref(false);
</script>

<template>
  <main :data-theme="isDarkMode ? 'dark' : 'light'">
    <DayNightToggle v-model="isDarkMode" size="md" />
  </main>
</template>
```

---

## 🎨 Customizing with CSS Variables

All sizing, speed, and easing parameters are controlled via clean CSS Custom Properties:

| CSS Variable | Default | Description |
|---|---|---|
| `--toggle-width` | `240px` | Total width of the toggle track |
| `--toggle-height` | `96px` | Total height of the toggle track |
| `--anim-dur` | `0.65s` | Duration of the celestial transition |
| `--ease-elastic` | `cubic-bezier(0.34, 1.25, 0.64, 1)` | Physics spring easing curve |
| `--sky-day-top` | `#2563eb` | Top gradient color for daytime sky |
| `--sky-night-top`| `#101624` | Top gradient color for midnight sky |
| `--sun-core` | `#ffd000` | Golden core color of the sun |
| `--sun-crescent` | `#ffb703` | Crescent rim light visible under the moon |
| `--moon-surface` | `#e2e8f0` | Lunar surface color |
| `--crater-color` | `#9cb0c9` | Lunar crater fill |

---

## 📂 Project Structure

```
fluid-day-night-toggle/
├── index.html           # Full interactive showcase with live controls & theme preview
├── styles.css           # Showcase layout & full theme variables
├── script.js            # Synthesized SFX, speed/scale controls & theme sync
├── DayNightToggle.css   # Standalone component styles
├── DayNightToggle.jsx   # Standalone React component
├── DayNightToggle.vue   # Standalone Vue 3 component
└── README.md            # Documentation & API reference
```
