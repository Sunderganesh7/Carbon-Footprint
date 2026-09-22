import { memo } from 'react';
import type { LifestyleInput } from '../../types';
import { InputField } from '../ui/InputField';

interface LifestyleFormProps {
  data: LifestyleInput;
  onChange: (field: keyof LifestyleInput, value: number) => void;
}

export const LifestyleForm = memo(function LifestyleForm({ data, onChange }: LifestyleFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-slate-800">Lifestyle</h3>
      <p className="text-sm text-slate-500">
        Enter your monthly lifestyle habits.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Online Shopping"
          type="number"
          min={0}
          max={50}
          value={data.onlineShoppingFrequency}
          onChange={(e) =>
            onChange('onlineShoppingFrequency', Number(e.target.value))
          }
          unit="orders/month"
          helperText="Online orders per month"
        />
        <InputField
          label="Waste Generation"
          type="number"
          min={0}
          max={50}
          value={data.wasteGeneration}
          onChange={(e) => onChange('wasteGeneration', Number(e.target.value))}
          unit="bags/week"
          helperText="Waste bags per week"
        />
      </div>
    </div>
  );
});
