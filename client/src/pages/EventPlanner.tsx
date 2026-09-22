import { useState, useMemo, useCallback } from 'react';
import type { EventInput, EventResult } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { InputField } from '../components/ui/InputField';
import { Badge } from '../components/ui/Badge';
import { formatEmissions } from '../utils/format';
import { calculateEventFootprint, getEcoVendors, getVenueSuggestions } from '../utils/eventCalculations';

const initialInput: EventInput = {
  eventType: 'party', guestCount: 50, duration: 4, venueType: 'indoor', cateringType: 'mixed', wasteManagement: 'basic',
};

function SelectField({ label, value, options, onChange, id }: {
  label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void; id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-label={label}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export function EventPlanner() {
  const [input, setInput] = useState<EventInput>(initialInput);
  const [showResults, setShowResults] = useState(false);

  const updateField = useCallback(<K extends keyof EventInput>(field: K, value: EventInput[K]) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  }, []);

  const result = useMemo(() => calculateEventFootprint(input), [input]);

  const handleCalculate = () => setShowResults(true);

  if (showResults) {
    return <EventResults input={input} result={result} onReset={() => { setShowResults(false); setInput(initialInput); }} />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Sustainable Event Planner</h1>
        <p className="text-slate-500">Plan eco-friendly events with AI-powered carbon estimates and vendor suggestions.</p>
      </div>
      <Card>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-slate-800">Event Details</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField id="event-type" label="Event Type" value={input.eventType}
              options={[{ value: 'wedding', label: 'Wedding' }, { value: 'conference', label: 'Conference' }, { value: 'party', label: 'Party' }, { value: 'corporate', label: 'Corporate' }, { value: 'other', label: 'Other' }]}
              onChange={(v) => updateField('eventType', v as EventInput['eventType'])} />
            <SelectField id="venue-type" label="Venue Type" value={input.venueType}
              options={[{ value: 'indoor', label: 'Indoor' }, { value: 'outdoor', label: 'Outdoor' }, { value: 'hybrid', label: 'Hybrid' }]}
              onChange={(v) => updateField('venueType', v as EventInput['venueType'])} />
            <SelectField id="catering-type" label="Catering Type" value={input.cateringType}
              options={[{ value: 'vegetarian', label: 'Vegetarian' }, { value: 'vegan', label: 'Vegan' }, { value: 'non-vegetarian', label: 'Non-Vegetarian' }, { value: 'mixed', label: 'Mixed' }]}
              onChange={(v) => updateField('cateringType', v as EventInput['cateringType'])} />
            <SelectField id="waste-management" label="Waste Management" value={input.wasteManagement}
              options={[{ value: 'none', label: 'None' }, { value: 'basic', label: 'Basic' }, { value: 'recycling', label: 'Recycling' }, { value: 'composting', label: 'Composting' }, { value: 'zero-waste', label: 'Zero Waste' }]}
              onChange={(v) => updateField('wasteManagement', v as EventInput['wasteManagement'])} />
            <InputField id="guest-count" label="Guest Count" type="number" min={1} max={10000} value={input.guestCount}
              onChange={(e) => updateField('guestCount', Number(e.target.value))} />
            <InputField id="event-duration" label="Duration (hours)" type="number" min={1} max={168} value={input.duration}
              onChange={(e) => updateField('duration', Number(e.target.value))} />
          </div>
        </div>
        <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
          <Button onClick={handleCalculate}>Calculate Event Footprint</Button>
        </div>
      </Card>
    </div>
  );
}

function EventResults({ input, result, onReset }: { input: EventInput; result: EventResult; onReset: () => void }) {
  const vendors = useMemo(() => getEcoVendors(), []);
  const venueTips = useMemo(() => getVenueSuggestions(input.eventType), [input.eventType]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Event Carbon Footprint</h1>
        <p className="text-slate-500">Estimated emissions for your {input.eventType} with {input.guestCount} guests.</p>
      </div>

      <div className="mb-6 text-center">
        <Card>
          <p className="text-sm font-medium text-slate-500">Total Estimated Emissions</p>
          <p className="text-5xl font-bold text-emerald-600">{formatEmissions(result.totalEmissions)}</p>
          <p className="mt-1 text-sm text-slate-400">CO₂ equivalent</p>
          {result.offsetCost > 0 && (
            <p className="mt-2 text-sm text-slate-500">Offset for ~${result.offsetCost.toFixed(2)} via verified carbon credits</p>
          )}
        </Card>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Travel</p>
          <p className="mt-1 text-xl font-bold text-blue-600">{formatEmissions(result.travelEmissions)}</p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Catering</p>
          <p className="mt-1 text-xl font-bold text-amber-600">{formatEmissions(result.cateringEmissions)}</p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Energy</p>
          <p className="mt-1 text-xl font-bold text-purple-600">{formatEmissions(result.energyEmissions)}</p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Waste</p>
          <p className="mt-1 text-xl font-bold text-red-600">{formatEmissions(result.wasteEmissions)}</p>
        </Card>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Eco-Friendly Vendor Suggestions</h3>
          <div className="space-y-3">
            {vendors.map((v) => (
              <div key={v.name} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-700">{v.name}</p>
                  <p className="text-xs text-slate-400">{v.category}</p>
                </div>
                <Badge variant={v.rating >= 4.7 ? 'success' : v.rating >= 4.5 ? 'info' : 'default'}>
                  {v.rating} ★
                </Badge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-800">Venue Suggestions</h3>
          <ul className="space-y-2">
            {venueTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button variant="outline" onClick={onReset}>Plan Another Event</Button>
        <Button onClick={() => window.location.href = '/calculator'}>Try Carbon Calculator</Button>
      </div>
    </div>
  );
}
