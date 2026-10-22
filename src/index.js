/**
 * Fluid Sun-to-Moon Day/Night Toggle
 * Root package entrypoint
 */

// Auto-register the universal custom element `<day-night-toggle>`
export * from './web-component/day-night-toggle.js';

// Export React component
export { DayNightToggle as ReactDayNightToggle } from './react/DayNightToggle.jsx';

// Export Vue component
export { default as VueDayNightToggle } from './vue/DayNightToggle.vue';
