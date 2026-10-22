import React from 'react';

export interface DayNightToggleProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  id?: string;
}

export declare const DayNightToggle: React.FC<DayNightToggleProps>;
export default DayNightToggle;
