import { memo } from 'react';
import type { EnergyInput } from '../../types';
import { InputField } from '../ui/InputField';

interface EnergyFormProps {
  data: EnergyInput;
  onChange: (field: keyof EnergyInput, value: number) => void;
}

export const EnergyForm = memo(function EnergyForm({ data, onChange }: EnergyFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-slate-800">Energy</h3>
      <p className="text-sm text-slate-500">
        Enter your daily energy usage.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Electricity Usage"
          type="number"
          min={0}
          max={10000}
          value={data.electricityUsage}
          onChange={(e) => onChange('electricityUsage', Number(e.target.value))}
          unit="kWh/month"
          helperText="Monthly electricity bill in kWh"
        />
        <InputField
          label="AC Usage"
          type="number"
          min={0}
          max={720}
          value={data.acUsage}
          onChange={(e) => onChange('acUsage', Number(e.target.value))}
          unit="hours/month"
          helperText="Hours of AC use per month"
        />
      </div>
    </div>
  );
});
