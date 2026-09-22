import { memo } from 'react';
import type { TransportationInput } from '../../types';
import { InputField } from '../ui/InputField';

interface TransportFormProps {
  data: TransportationInput;
  onChange: (field: keyof TransportationInput, value: number) => void;
}

export const TransportForm = memo(function TransportForm({ data, onChange }: TransportFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-slate-800">
        Transportation
      </h3>
      <p className="text-sm text-slate-500">
        Enter your average daily travel distances.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Car Travel"
          type="number"
          min={0}
          max={500}
          value={data.carDistance}
          onChange={(e) => onChange('carDistance', Number(e.target.value))}
          unit="km/day"
          helperText="Distance driven per day"
        />
        <InputField
          label="Bicycle Travel"
          type="number"
          min={0}
          max={500}
          value={data.bikeDistance}
          onChange={(e) => onChange('bikeDistance', Number(e.target.value))}
          unit="km/day"
          helperText="Distance cycled per day"
        />
        <InputField
          label="Bus Travel"
          type="number"
          min={0}
          max={500}
          value={data.busDistance}
          onChange={(e) => onChange('busDistance', Number(e.target.value))}
          unit="km/day"
          helperText="Distance by bus per day"
        />
        <InputField
          label="Train Travel"
          type="number"
          min={0}
          max={500}
          value={data.trainDistance}
          onChange={(e) => onChange('trainDistance', Number(e.target.value))}
          unit="km/day"
          helperText="Distance by train per day"
        />
      </div>
    </div>
  );
});
