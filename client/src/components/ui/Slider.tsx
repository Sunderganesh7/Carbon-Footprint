import { type InputHTMLAttributes } from 'react';

interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  displayValue?: string;
}

export function Slider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  displayValue,
  onChange,
  id,
  className = '',
  ...props
}: SliderProps) {
  const sliderId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor={sliderId}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
        <span className="text-sm font-semibold text-emerald-600" aria-live="polite">
          {displayValue ?? `${value}${unit}`}
        </span>
      </div>
      <input
        id={sliderId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus-visible:ring-offset-2"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex={0}
        {...props}
      />
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
