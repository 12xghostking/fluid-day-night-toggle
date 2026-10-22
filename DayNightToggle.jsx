import React from 'react';
import './DayNightToggle.css';

/**
 * DayNightToggle Component
 * @param {Object} props
 * @param {boolean} props.checked - Current checked/dark state
 * @param {function} props.onChange - Triggered on toggle change (e) => void
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Sizing variant
 * @param {string} [props.className] - Additional CSS classes
 */
export function DayNightToggle({ 
  checked = false, 
  onChange, 
  size = 'md', 
  className = '',
  id = 'day-night-toggle-input',
  ...rest 
}) {
  return (
    <label 
      htmlFor={id} 
      className={`day-night-toggle size-${size} ${className}`}
      aria-label="Toggle dark/light theme"
    >
      <input
        type="checkbox"
        id={id}
        className="toggle-input"
        role="switch"
        aria-checked={checked}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      
      <div className="toggle-track">
        {/* Daytime Sky & Layered Clouds */}
        <div className="sky sky-day">
          <svg className="clouds-svg" viewBox="0 0 240 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="reactCloudGradBack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="reactCloudGradFront" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#edf4fc" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <path fill="url(#reactCloudGradBack)" d="
              M 95 100 L 240 100 L 240 46
              C 230 43, 218 46, 212 55
              C 205 38, 185 35, 172 47
              C 165 42, 150 42, 142 50
              C 134 46, 120 48, 115 58
              C 107 55, 98 62, 95 72 Z"
            />
            <path fill="url(#reactCloudGradFront)" d="
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

        {/* Nighttime Midnight Sky with Sparkles & Stars */}
        <div className="sky sky-night">
          <div className="stars-layer">
            <svg className="star star-sparkle star-1" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" fill="#ffffff" />
            </svg>
            <svg className="star star-sparkle star-2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" fill="#ffffff" />
            </svg>
            <svg className="star star-sparkle star-3" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M 12 0 C 12 7, 7 12, 0 12 C 7 12, 12 17, 12 24 C 12 17, 17 12, 24 12 C 17 12, 12 7, 12 0 Z" fill="#ffffff" />
            </svg>

            <span className="star star-dot dot-1" />
            <span className="star star-dot dot-2" />
            <span className="star star-dot dot-3" />
            <span className="star star-dot dot-4" />
            <span className="star star-dot dot-5" />
            <span className="star star-dot dot-6" />
            <span className="star star-dot dot-7" />
            <span className="star star-dot dot-8" />
          </div>
        </div>

        {/* 3D Cutout Inset Cavity Overlay */}
        <div className="cavity-overlay" aria-hidden="true" />

        {/* The Fluid Celestial Thumb */}
        <div className="toggle-thumb">
          <div className="sun-body" />
          <div className="moon-body">
            <div className="crater crater-1" />
            <div className="crater crater-2" />
            <div className="crater crater-3" />
          </div>
        </div>
      </div>
    </label>
  );
}

export default DayNightToggle;
