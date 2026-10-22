<template>
  <label
    :for="id"
    class="day-night-toggle"
    :class="`size-${size}`"
    aria-label="Toggle dark/light theme"
  >
    <input
      :id="id"
      type="checkbox"
      class="toggle-input"
      role="switch"
      :aria-checked="modelValue"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />

    <div class="toggle-track">
      <!-- Day Sky Layer -->
      <div class="sky sky-day">
        <svg class="clouds-svg" viewBox="0 0 240 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="vueCloudGradBack" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55" />
              <stop offset="100%" stop-color="#bfdbfe" stop-opacity="0.3" />
            </linearGradient>
            <linearGradient id="vueCloudGradFront" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98" />
              <stop offset="100%" stop-color="#edf4fc" stop-opacity="0.95" />
            </linearGradient>
          </defs>
          <path fill="url(#vueCloudGradBack)" d="
            M 95 100 L 240 100 L 240 46
            C 230 43, 218 46, 212 55
            C 205 38, 185 35, 172 47
            C 165 42, 150 42, 142 50
            C 134 46, 120 48, 115 58
            C 107 55, 98 62, 95 72 Z"
          />
          <path fill="url(#vueCloudGradFront)" d="
            M 45 100 L 240 100 L 240 54
            C 232 46, 218 48, 210 59
            C 202 50, 186 49, 176 60
            C 166 52, 148 54, 140 65
            C 130 58, 114 62, 108 72
            C 98 66, 84 70, 78 80
            C 68 76, 54 84, 48 94 Z"
          />
        </svg>
      </div>

      <!-- Night Sky Layer -->
      <div class="sky sky-night">
        <div class="stars-layer">
          <svg class="star star-sparkle star-1" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" fill="#ffffff" />
          </svg>
          <svg class="star star-sparkle star-2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" fill="#ffffff" />
          </svg>
          <svg class="star star-sparkle star-3" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" fill="#ffffff" />
          </svg>

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

      <!-- 3D Cavity Inset Shadow Overlay -->
      <div class="cavity-overlay" aria-hidden="true"></div>

      <!-- The Celestial Thumb -->
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
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md',
    validator: (val) => ['sm', 'md', 'lg'].includes(val)
  },
  id: {
    type: String,
    default: 'day-night-toggle-vue'
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
@import './DayNightToggle.css';
</style>
