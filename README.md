# Fluid Sun-to-Moon Day/Night Toggle Switch ☀️ ⇄ 🌙

A physics-inspired, fluid Day/Night mode toggle engineered with 3D inset cavity depth, celestial morphing, dynamic eclipse rim lighting, and atmospheric sky transitions.

Works seamlessly across **any** project or framework: **React**, **Vue 3**, **Universal Web Component (`<day-night-toggle>`)**, and **Vanilla HTML/CSS**.

---

## 🚀 Installation & Usage Across Projects

### 1. Universal Web Component (Any Framework or Plain HTML)

Works in React, Vue, Svelte, Angular, Astro, WordPress, Shopify, or plain HTML without configuration:

```html
<!-- Import once (from NPM or CDN) -->
<script type="module" src="https://unpkg.com/fluid-day-night-toggle"></script>

<!-- Use anywhere in your markup -->
<day-night-toggle checked size="md" sound="true"></day-night-toggle>

<script>
  const toggle = document.querySelector('day-night-toggle');
  toggle.addEventListener('change', (e) => {
    console.log('Is Night Mode:', e.detail.checked);
    document.documentElement.setAttribute('data-theme', e.detail.checked ? 'dark' : 'light');
  });
</script>
```

---

### 2. React / Next.js

```bash
npm install fluid-day-night-toggle
```

```jsx
import React, { useState } from 'react';
import { DayNightToggle } from 'fluid-day-night-toggle/react';

export default function ThemeSwitch() {
  const [isDark, setIsDark] = useState(false);

  return (
    <DayNightToggle 
      checked={isDark} 
      onChange={(e) => setIsDark(e.target.checked)} 
      size="md" // 'sm' | 'md' | 'lg'
    />
  );
}
```

---

### 3. Vue 3 (Composition API)

```bash
npm install fluid-day-night-toggle
```

```vue
<script setup>
import { ref } from 'vue';
import { DayNightToggle } from 'fluid-day-night-toggle/vue';

const isDarkMode = ref(false);
</script>

<template>
  <DayNightToggle v-model="isDarkMode" size="md" />
</template>
```

---

### 4. Pure CSS + HTML (Zero Dependencies)

Include the CSS and drop the markup:

```html
<link rel="stylesheet" href="node_modules/fluid-day-night-toggle/src/DayNightToggle.css">
<!-- or via CDN -->
<link rel="stylesheet" href="https://unpkg.com/fluid-day-night-toggle/src/DayNightToggle.css">

<label class="day-night-toggle size-md">
  <input type="checkbox" class="toggle-input" role="switch" aria-label="Toggle theme" />
  <div class="toggle-track">
    <div class="sky sky-day">
      <svg class="clouds-svg" viewBox="0 0 240 100" preserveAspectRatio="none">
        <path fill="rgba(255,255,255,0.5)" d="M 95 100 L 240 100 L 240 46 C 230 43, 218 46, 212 55 C 205 38, 185 35, 172 47 C 165 42, 150 42, 142 50 C 134 46, 120 48, 115 58 C 107 55, 98 62, 95 72 Z" />
        <path fill="#ffffff" d="M 45 100 L 240 100 L 240 54 C 232 46, 218 48, 210 59 C 202 50, 186 49, 176 60 C 166 52, 148 54, 140 65 C 130 58, 114 62, 108 72 C 98 66, 84 70, 78 80 C 68 76, 54 84, 48 94 Z" />
      </svg>
    </div>
    <div class="sky sky-night">
      <div class="stars-layer">
        <svg class="star star-sparkle star-1" viewBox="0 0 24 24"><path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" /></svg>
        <svg class="star star-sparkle star-2" viewBox="0 0 24 24"><path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" /></svg>
        <svg class="star star-sparkle star-3" viewBox="0 0 24 24"><path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" /></svg>
        <span class="star star-dot dot-1"></span>
        <span class="star star-dot dot-2"></span>
        <span class="star star-dot dot-3"></span>
      </div>
    </div>
    <div class="cavity-overlay"></div>
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

---

## 📤 How to Upload to GitHub

1. Create a new repository on [GitHub](https://github.com/new) named `fluid-day-night-toggle`.
2. In your terminal, run:
```bash
cd c:\Users\sirki\projects\fluid-day-night-toggle
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fluid-day-night-toggle.git
git push -u origin main
```

> **Tip**: Once on GitHub, anyone can install directly from your repository without even publishing to npm:
> ```bash
> npm install github:YOUR_USERNAME/fluid-day-night-toggle
> ```

---

## 📦 How to Publish to NPM

1. If you don't already have an NPM account, create one at [npmjs.com](https://www.npmjs.com).
2. Log in via your terminal:
```bash
npm login
```
3. *(Optional)* If the package name `fluid-day-night-toggle` is already taken on npm, update the `"name"` in `package.json` to a scoped name (e.g. `"@YOUR_USERNAME/fluid-day-night-toggle"`).
4. Publish the package:
```bash
npm publish --access public
```

Once published, your package is instantly available globally on:
- **npm**: `npm i fluid-day-night-toggle`
- **unpkg CDN**: `https://unpkg.com/fluid-day-night-toggle`
- **jsdelivr CDN**: `https://cdn.jsdelivr.net/npm/fluid-day-night-toggle`

---

## 🎨 CSS Variables & Customization

| Variable | Default | Purpose |
|---|---|---|
| `--toggle-width` | `240px` | Total width |
| `--toggle-height` | `96px` | Total height |
| `--anim-dur` | `0.65s` | Transition duration |
| `--ease-elastic` | `cubic-bezier(0.34, 1.25, 0.64, 1)` | Physical bounce curve |

---

## 📄 License

MIT
