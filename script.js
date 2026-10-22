/**
 * Fluid Sun to Moon Day/Night Toggle
 * Interaction Controller & Web Audio Synthesizer
 */

(function () {
  'use strict';

  // DOM Elements
  const html = document.documentElement;
  const toggleInput = document.getElementById('day-night-checkbox');
  const toggleThumb = document.querySelector('.toggle-thumb');
  const modeLabel = document.getElementById('current-mode-label');
  const speedRange = document.getElementById('speed-range');
  const speedVal = document.getElementById('speed-val');
  const presetButtons = document.querySelectorAll('.preset-btn');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundLabel = document.getElementById('sound-label');
  const codeTabs = document.querySelectorAll('.code-tab');
  const codePanels = document.querySelectorAll('.code-panel');
  const copyButtons = document.querySelectorAll('.copy-btn');

  // Audio Context for Zero-Dependency Synthesized SFX
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play synthesized fluid tone
  function playCelestialSound(isNight) {
    if (!isSoundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      // Atmospheric filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isNight ? 1200 : 800, now);
      filter.frequency.exponentialRampToValueAtTime(isNight ? 400 : 2400, now + 0.35);

      if (isNight) {
        // Night sound: gentle descending harmonic chime into calm darkness
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.15); // E4
        osc.frequency.exponentialRampToValueAtTime(220.00, now + 0.35); // A3

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      } else {
        // Day sound: warm uplifting sunrise chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(261.63, now); // C4
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.12); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.3); // E5

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.14, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      }

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.52);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Clean up animation classes upon completion so standard transitions resume flawlessly
  if (toggleThumb) {
    toggleThumb.addEventListener('animationend', () => {
      toggleThumb.classList.remove('animating-to-night', 'animating-to-day');
    });
  }

  // Handle Theme Switching
  function updateTheme(isDark, triggeredByUser = false) {
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    toggleInput.setAttribute('aria-checked', isDark ? 'true' : 'false');
    modeLabel.textContent = isDark ? 'Night Mode' : 'Light Mode';

    // Trigger physical squash & stretch keyframes on thumb
    if (toggleThumb && triggeredByUser) {
      toggleThumb.classList.remove('animating-to-night', 'animating-to-day');
      // Trigger DOM reflow to restart CSS animation cleanly
      void toggleThumb.offsetWidth;
      if (isDark) {
        toggleThumb.classList.add('animating-to-night');
      } else {
        toggleThumb.classList.add('animating-to-day');
      }
    }

    if (triggeredByUser) {
      playCelestialSound(isDark);
    }
  }

  // Toggle Checkbox Change Listener
  toggleInput.addEventListener('change', (e) => {
    updateTheme(e.target.checked, true);
  });

  // Sound Toggle Button
  soundToggleBtn.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    soundToggleBtn.classList.toggle('muted', !isSoundEnabled);
    soundLabel.textContent = isSoundEnabled ? 'Sound FX' : 'Muted';
    if (isSoundEnabled) {
      initAudio();
    }
  });

  // Animation Speed Slider
  speedRange.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    speedVal.textContent = val.toFixed(2) + 's';
    html.style.setProperty('--anim-speed', val + 's');
  });

  // Size Preset Buttons
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      presetButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const scale = btn.getAttribute('data-scale');
      html.style.setProperty('--toggle-scale', scale);
    });
  });

  // Code Tab Switching
  codeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      codeTabs.forEach((t) => t.classList.remove('active'));
      codePanels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(`panel-${targetId}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Copy Code to Clipboard
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-clipboard');
      const codeElement = document.getElementById(targetId);
      if (!codeElement) return;

      const text = codeElement.innerText || codeElement.textContent;
      navigator.clipboard.writeText(text).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Copied!
        `;
        btn.style.borderColor = '#10b981';
        btn.style.color = '#10b981';

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2200);
      });
    });
  });

  // Check system preferred color scheme initially
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleInput.checked = true;
    updateTheme(true, false);
  }
})();
