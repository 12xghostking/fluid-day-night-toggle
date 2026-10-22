/**
 * <day-night-toggle> Universal Custom Element
 * Self-contained Shadow DOM Web Component compatible with ALL frameworks (React, Vue, Angular, Svelte, Vanilla HTML).
 */

class DayNightToggleElement extends HTMLElement {
  static get observedAttributes() {
    return ['checked', 'size', 'sound', 'disabled'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._audioCtx = null;
  }

  get checked() {
    return this.hasAttribute('checked');
  }

  set checked(val) {
    if (Boolean(val)) {
      this.setAttribute('checked', '');
    } else {
      this.removeAttribute('checked');
    }
  }

  get size() {
    return this.getAttribute('size') || 'md';
  }

  set size(val) {
    this.setAttribute('size', val);
  }

  get sound() {
    return this.getAttribute('sound') !== 'false';
  }

  set sound(val) {
    this.setAttribute('sound', String(val));
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === 'checked') {
      this.updateCheckedState();
    } else if (name === 'size') {
      this.updateSizeState();
    }
  }

  initAudio() {
    if (!this._audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this._audioCtx = new AudioContext();
      }
    }
    if (this._audioCtx && this._audioCtx.state === 'suspended') {
      this._audioCtx.resume();
    }
  }

  playCelestialSound(isNight) {
    if (!this.sound) return;
    try {
      this.initAudio();
      if (!this._audioCtx) return;

      const now = this._audioCtx.currentTime;
      const osc = this._audioCtx.createOscillator();
      const gain = this._audioCtx.createGain();
      const filter = this._audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isNight ? 1200 : 800, now);
      filter.frequency.exponentialRampToValueAtTime(isNight ? 400 : 2400, now + 0.35);

      if (isNight) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(220.00, now + 0.35);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(261.63, now);
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.3);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.14, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      }

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this._audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.52);
    } catch (e) {}
  }

  toggle() {
    if (this.hasAttribute('disabled')) return;
    this.checked = !this.checked;
    this.playCelestialSound(this.checked);
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true
      })
    );
  }

  setupListeners() {
    const host = this.shadowRoot.querySelector('.day-night-toggle');
    if (!host) return;

    this.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    this.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.toggle();
      }
    });

    // Make custom element focusable
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    this.setAttribute('role', 'switch');
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
  }

  updateCheckedState() {
    this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    const input = this.shadowRoot.querySelector('.toggle-input');
    if (input) {
      input.checked = this.checked;
    }
  }

  updateSizeState() {
    const label = this.shadowRoot.querySelector('.day-night-toggle');
    if (label) {
      label.className = `day-night-toggle size-${this.size}`;
    }
  }

  render() {
    const isChecked = this.checked;
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          vertical-align: middle;
          outline: none;
        }

        :host(:focus-visible) .toggle-track {
          outline: 3px solid #3b82f6;
          outline-offset: 4px;
        }

        .day-night-toggle {
          --toggle-width: 240px;
          --toggle-height: 96px;
          --toggle-pad: 8px;
          --thumb-d: calc(var(--toggle-height) - (var(--toggle-pad) * 2));
          --travel-x: calc(var(--toggle-width) - var(--thumb-d) - (var(--toggle-pad) * 2));
          --anim-dur: 0.65s;
          --ease-elastic: cubic-bezier(0.34, 1.25, 0.64, 1);
          --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
          --ease-clouds: cubic-bezier(0.34, 1.15, 0.64, 1);

          position: relative;
          display: inline-block;
          width: var(--toggle-width);
          height: var(--toggle-height);
          cursor: pointer;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
          transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.4, 1);
        }

        .day-night-toggle:active {
          transform: scale(0.97);
        }

        .day-night-toggle.size-sm {
          --toggle-width: 150px;
          --toggle-height: 60px;
          --toggle-pad: 5px;
        }

        .day-night-toggle.size-md {
          --toggle-width: 200px;
          --toggle-height: 80px;
          --toggle-pad: 7px;
        }

        .day-night-toggle.size-lg {
          --toggle-width: 280px;
          --toggle-height: 112px;
          --toggle-pad: 10px;
        }

        .toggle-input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
          pointer-events: none;
        }

        .toggle-track {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: calc(var(--toggle-height) / 2);
          overflow: hidden;
          box-sizing: border-box;
          border: 4px solid #e2e8f0;
          box-shadow: 
            inset 0 10px 18px -2px rgba(0, 0, 0, 0.55),
            inset 0 4px 6px rgba(0, 0, 0, 0.45),
            inset 0 -4px 8px rgba(255, 255, 255, 0.3),
            0 8px 24px -6px rgba(0, 0, 0, 0.16);
          transition: border-color var(--anim-dur) ease;
        }

        .toggle-input:checked ~ .toggle-track {
          border-color: #1e293b;
        }

        .sky {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          transition: opacity var(--anim-dur) var(--ease-smooth);
        }

        .sky-day {
          background: linear-gradient(180deg, #2563eb 0%, #3b82f6 45%, #93c5fd 100%);
          opacity: 1;
          z-index: 1;
        }

        .sky-night {
          background: linear-gradient(180deg, #101624 0%, #182338 50%, #243553 100%);
          opacity: 0;
          z-index: 1;
        }

        .toggle-input:checked ~ .toggle-track .sky-day { opacity: 0; }
        .toggle-input:checked ~ .toggle-track .sky-night { opacity: 1; }

        .clouds-svg {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          transform: translateY(0);
          opacity: 1;
          transition: 
            transform var(--anim-dur) var(--ease-clouds),
            opacity calc(var(--anim-dur) * 0.8) var(--ease-smooth);
        }

        .toggle-input:checked ~ .toggle-track .clouds-svg {
          transform: translateY(115%) scale(0.92);
          opacity: 0;
        }

        .stars-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .star {
          position: absolute;
          opacity: 0;
          transform: scale(0) rotate(-45deg);
          transition: 
            opacity calc(var(--anim-dur) * 0.7) var(--ease-smooth),
            transform var(--anim-dur) var(--ease-elastic);
        }

        .star-sparkle {
          fill: #ffffff;
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.9));
        }

        .star-1 { top: 20%; left: 27%; width: 15px; height: 15px; transition-delay: 0.14s; }
        .star-2 { top: 36%; left: 54%; width: 19px; height: 19px; transition-delay: 0.2s; }
        .star-3 { top: 59%; left: 45%; width: 12px; height: 12px; transition-delay: 0.26s; }

        .star-dot {
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 3px rgba(255, 255, 255, 0.9);
        }

        .dot-1 { top: 38%; left: 18%; width: 4px; height: 4px; transition-delay: 0.12s; }
        .dot-2 { top: 46%; left: 28%; width: 3.5px; height: 3.5px; transition-delay: 0.18s; }
        .dot-3 { top: 58%; left: 21%; width: 4px; height: 4px; transition-delay: 0.24s; }
        .dot-4 { top: 65%; left: 28%; width: 3px; height: 3px; transition-delay: 0.3s; }
        .dot-5 { top: 35%; left: 42%; width: 3px; height: 3px; transition-delay: 0.2s; }
        .dot-6 { top: 52%; left: 52%; width: 4px; height: 4px; transition-delay: 0.26s; }
        .dot-7 { top: 19%; left: 47%; width: 3px; height: 3px; transition-delay: 0.16s; }
        .dot-8 { top: 66%; left: 19%; width: 2.5px; height: 2.5px; transition-delay: 0.32s; }

        .toggle-input:checked ~ .toggle-track .star {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        .cavity-overlay {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          z-index: 4;
          box-shadow: 
            inset 0 10px 14px -3px rgba(0, 0, 0, 0.48),
            inset 0 3px 5px rgba(0, 0, 0, 0.35),
            inset 0 -3px 6px rgba(255, 255, 255, 0.2);
        }

        .toggle-thumb {
          position: absolute;
          top: var(--toggle-pad);
          left: var(--toggle-pad);
          width: var(--thumb-d);
          height: var(--thumb-d);
          border-radius: 50%;
          overflow: hidden;
          z-index: 5;
          box-shadow: 
            0 4px 18px rgba(255, 183, 3, 0.65),
            inset 0 3px 6px rgba(255, 255, 255, 0.8),
            inset 0 -4px 6px rgba(0, 0, 0, 0.25);
          transform: translateX(0);
          transition: 
            transform var(--anim-dur) var(--ease-elastic),
            box-shadow var(--anim-dur) var(--ease-smooth);
          will-change: transform;
        }

        .toggle-input:checked ~ .toggle-track .toggle-thumb {
          transform: translateX(var(--travel-x));
          box-shadow: 
            0 4px 18px rgba(0, 0, 0, 0.45),
            inset 0 3px 6px rgba(255, 255, 255, 0.8),
            inset 0 -4px 6px rgba(0, 0, 0, 0.35);
        }

        .sun-body {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #fff59d 0%, #ffd000 45%, #ff8f00 100%);
          z-index: 1;
        }

        .moon-body {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 38% 38%, #ffffff 0%, #e2e8f0 52%, #cbd5e1 100%);
          box-shadow: 
            -4px 0 8px rgba(0, 0, 0, 0.28),
            inset 0 3px 6px rgba(255, 255, 255, 0.9),
            inset 0 -4px 8px rgba(100, 116, 139, 0.35);
          transform: translateX(105%);
          transition: transform var(--anim-dur) var(--ease-elastic);
          z-index: 2;
          will-change: transform;
        }

        .toggle-input:checked ~ .toggle-track .moon-body {
          transform: translateX(7%);
        }

        .crater {
          position: absolute;
          border-radius: 50%;
          background: #9cb0c9;
          box-shadow: 
            inset 0 2px 4px rgba(71, 85, 105, 0.7),
            inset 0 -1px 2px rgba(255, 255, 255, 0.4);
          opacity: 0;
          transform: scale(0);
          transition: 
            transform calc(var(--anim-dur) * 0.9) var(--ease-elastic),
            opacity calc(var(--anim-dur) * 0.7) var(--ease-smooth);
        }

        .crater-1 { width: 23%; height: 23%; top: 18%; right: 25%; transition-delay: 0.1s; }
        .crater-2 { width: 38%; height: 38%; bottom: 14%; left: 20%; transition-delay: 0.16s; }
        .crater-3 { width: 20%; height: 20%; bottom: 22%; right: 14%; transition-delay: 0.22s; }

        .toggle-input:checked ~ .toggle-track .crater {
          opacity: 1;
          transform: scale(1);
        }
      </style>

      <div class="day-night-toggle size-${this.size}">
        <input type="checkbox" class="toggle-input" ${isChecked ? 'checked' : ''} tabindex="-1" />
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
              <span class="star star-dot dot-4"></span>
              <span class="star star-dot dot-5"></span>
              <span class="star star-dot dot-6"></span>
              <span class="star star-dot dot-7"></span>
              <span class="star star-dot dot-8"></span>
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
      </div>
    `;
  }
}

// Auto-register custom element
if (typeof window !== 'undefined' && !customElements.get('day-night-toggle')) {
  customElements.define('day-night-toggle', DayNightToggleElement);
}

export { DayNightToggleElement };
export default DayNightToggleElement;
