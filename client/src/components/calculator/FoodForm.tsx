import { memo } from 'react';
import type { FoodInput } from '../../types';
import { InputField } from '../ui/InputField';

interface FoodFormProps {
  data: FoodInput;
  onChange: (field: keyof FoodInput, value: number) => void;
}

export const FoodForm = memo(function FoodForm({ data, onChange }: FoodFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-slate-800">Food</h3>
      <p className="text-sm text-slate-500">
        Enter your weekly meal counts.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Vegetarian Meals"
          type="number"
          min={0}
          max={21}
          value={data.vegetarianMeals}
          onChange={(e) => onChange('vegetarianMeals', Number(e.target.value))}
          unit="meals/week"
          helperText="Plant-based meals per week"
        />
        <InputField
          label="Non-Vegetarian Meals"
          type="number"
          min={0}
          max={21}
          value={data.nonVegetarianMeals}
          onChange={(e) =>
            onChange('nonVegetarianMeals', Number(e.target.value))
          }
          unit="meals/week"
          helperText="Meals with meat per week"
        />
      </div>
    </div>
  );
});
