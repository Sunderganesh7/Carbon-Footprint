import { memo } from 'react';
import { Slider } from '../ui/Slider';
import type { CarbonInput } from '../../types';

interface SimulatorControlsProps {
  input: CarbonInput;
  onFieldChange: (
    category: keyof CarbonInput,
    field: string,
    value: number,
  ) => void;
}

export const SimulatorControls = memo(function SimulatorControls({
  input,
  onFieldChange,
}: SimulatorControlsProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-base font-semibold text-slate-800">
          Transportation
        </h3>
        <div className="space-y-4">
          <Slider
            label="Car Travel"
            min={0}
            max={50}
            value={input.transportation.carDistance}
            onChange={(e) =>
              onFieldChange('transportation', 'carDistance', Number(e.target.value))
            }
            unit=" km/day"
          />
          <Slider
            label="Bus Travel"
            min={0}
            max={50}
            value={input.transportation.busDistance}
            onChange={(e) =>
              onFieldChange('transportation', 'busDistance', Number(e.target.value))
            }
            unit=" km/day"
          />
          <Slider
            label="Train Travel"
            min={0}
            max={50}
            value={input.transportation.trainDistance}
            onChange={(e) =>
              onFieldChange('transportation', 'trainDistance', Number(e.target.value))
            }
            unit=" km/day"
          />
          <Slider
            label="Bike Travel"
            min={0}
            max={50}
            value={input.transportation.bikeDistance}
            onChange={(e) =>
              onFieldChange('transportation', 'bikeDistance', Number(e.target.value))
            }
            unit=" km/day"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-base font-semibold text-slate-800">
          Energy
        </h3>
        <div className="space-y-4">
          <Slider
            label="Electricity Usage"
            min={0}
            max={2000}
            value={input.energy.electricityUsage}
            onChange={(e) =>
              onFieldChange('energy', 'electricityUsage', Number(e.target.value))
            }
            unit=" kWh/month"
          />
          <Slider
            label="AC Usage"
            min={0}
            max={100}
            value={input.energy.acUsage}
            onChange={(e) =>
              onFieldChange('energy', 'acUsage', Number(e.target.value))
            }
            unit=" hrs/month"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-base font-semibold text-slate-800">Food</h3>
        <div className="space-y-4">
          <Slider
            label="Vegetarian Meals"
            min={0}
            max={21}
            value={input.food.vegetarianMeals}
            onChange={(e) =>
              onFieldChange('food', 'vegetarianMeals', Number(e.target.value))
            }
            unit=" /week"
          />
          <Slider
            label="Non-Vegetarian Meals"
            min={0}
            max={21}
            value={input.food.nonVegetarianMeals}
            onChange={(e) =>
              onFieldChange('food', 'nonVegetarianMeals', Number(e.target.value))
            }
            unit=" /week"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-base font-semibold text-slate-800">
          Lifestyle
        </h3>
        <div className="space-y-4">
          <Slider
            label="Online Shopping"
            min={0}
            max={20}
            value={input.lifestyle.onlineShoppingFrequency}
            onChange={(e) =>
              onFieldChange(
                'lifestyle',
                'onlineShoppingFrequency',
                Number(e.target.value),
              )
            }
            unit=" /month"
          />
          <Slider
            label="Waste Generation"
            min={0}
            max={10}
            value={input.lifestyle.wasteGeneration}
            onChange={(e) =>
              onFieldChange('lifestyle', 'wasteGeneration', Number(e.target.value))
            }
            unit=" bags/week"
          />
        </div>
      </div>
    </div>
  );
});
