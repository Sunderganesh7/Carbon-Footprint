import { useState, useMemo, useCallback } from 'react';
import type { PlasticInput, PlasticResult } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Slider } from '../components/ui/Slider';
import { Badge } from '../components/ui/Badge';
import { formatEmissions } from '../utils/format';
import { calculatePlasticFootprint, generatePlasticAlternatives } from '../utils/plasticCalculations';

const initialInput: PlasticInput = {
  plasticBags: 5, plasticBottles: 3, straws: 4, packaging: 6, otherPlastic: 2,
};

export function PlasticFootprint() {
  const [input, setInput] = useState<PlasticInput>(initialInput);
  const [showResults, setShowResults] = useState(false);

  const updateField = useCallback((field: keyof PlasticInput, value: number) => {
    setInput((prev) => ({ ...prev, [field]: value }));
  }, []);

  const result = useMemo(() => calculatePlasticFootprint(input), [input]);

  const handleCalculate = () => setShowResults(true);

  if (showResults) {
    return <PlasticResults input={input} result={result} onReset={() => { setShowResults(false); setInput(initialInput); }} />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Plastic Footprint Analyzer</h1>
        <p className="text-slate-500">Estimate your weekly plastic waste and discover eco-friendly alternatives.</p>
      </div>
      <Card>
        <div className="space-y-6">
          <h3 className="text-base font-semibold text-slate-800">Weekly Plastic Usage</h3>
          <Slider label="Plastic Bags" min={0} max={30} value={input.plasticBags} onChange={(e) => updateField('plasticBags', Number(e.target.value))} unit=" /week" aria-label="Plastic bags used per week" />
          <Slider label="Plastic Bottles" min={0} max={30} value={input.plasticBottles} onChange={(e) => updateField('plasticBottles', Number(e.target.value))} unit=" /week" aria-label="Plastic bottles used per week" />
          <Slider label="Plastic Straws" min={0} max={50} value={input.straws} onChange={(e) => updateField('straws', Number(e.target.value))} unit=" /week" aria-label="Plastic straws used per week" />
          <Slider label="Packaging Items" min={0} max={30} value={input.packaging} onChange={(e) => updateField('packaging', Number(e.target.value))} unit=" /week" aria-label="Packaging items per week" />
          <Slider label="Other Plastic Items" min={0} max={20} value={input.otherPlastic} onChange={(e) => updateField('otherPlastic', Number(e.target.value))} unit=" /week" aria-label="Other plastic items per week" />
        </div>
        <div className="mt-8 flex justify-end border-t border-slate-100 pt-6">
          <Button onClick={handleCalculate}>Analyze Plastic Footprint</Button>
        </div>
      </Card>
    </div>
  );
}

function PlasticResults({ input, result, onReset }: { input: PlasticInput; result: PlasticResult; onReset: () => void }) {
  const alternatives = useMemo(() => {
    const cats: (keyof PlasticInput)[] = ['plasticBags', 'plasticBottles', 'straws', 'packaging', 'otherPlastic'];
    return cats.filter((c) => input[c] > 3).map((c) => ({ category: c, alternatives: generatePlasticAlternatives(c) }));
  }, [input]);

  const monthlyPlastic = result.totalPlasticKg * 4.33;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Your Plastic Footprint</h1>
        <p className="text-slate-500">Comprehensive analysis of your plastic waste impact.</p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Weekly Plastic</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{result.totalPlasticKg.toFixed(2)} kg</p>
          <p className="mt-0.5 text-xs text-slate-400">{formatEmissions(monthlyPlastic)} / month</p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">CO₂ Equivalent</p>
          <p className="mt-1 text-2xl font-bold text-blue-600">{formatEmissions(result.co2Equivalent)}</p>
          <p className="mt-0.5 text-xs text-slate-400">Per week from plastic</p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Recyclable</p>
          <p className="mt-1 text-2xl font-bold text-purple-600">{result.recyclablePercent.toFixed(0)}%</p>
          <p className="mt-0.5 text-xs text-slate-400">Of your plastic waste</p>
        </Card>
        <Card>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Ocean-Bound Risk</p>
          <p className={`mt-1 text-2xl font-bold ${result.oceanBoundPercent > 50 ? 'text-red-500' : 'text-amber-500'}`}>{result.oceanBoundPercent.toFixed(0)}%</p>
          <p className="mt-0.5 text-xs text-slate-400">Likely to reach oceans</p>
        </Card>
      </div>

      {alternatives.length > 0 && (
        <Card className="mb-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-800">AI-Powered Sustainable Alternatives</h3>
          <div className="space-y-4">
            {alternatives.map(({ category, alternatives: alts }) => (
              <div key={category}>
                <p className="mb-2 text-sm font-medium text-slate-700 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</p>
                <div className="flex flex-wrap gap-2">
                  {alts.map((alt) => (
                    <Badge key={alt} variant="success">{alt}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Reduction Strategy</h3>
        <p className="mb-3 text-sm text-slate-600">By switching to reusable alternatives, you can save approximately <strong className="text-emerald-600">{result.savings.toFixed(1)} kg</strong> of plastic waste per month — that&apos;s like preventing <strong className="text-emerald-600">{result.savings.toFixed(0)}</strong> single-use plastic items from entering the environment.</p>
        <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-500 transition-all duration-700" style={{ width: `${Math.min(100, result.recyclablePercent + 10)}%` }} />
        </div>
        <p className="mt-2 text-xs text-slate-400">Current recyclability potential: {result.recyclablePercent.toFixed(0)}%</p>
      </Card>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button variant="outline" onClick={onReset}>Calculate Again</Button>
        <Button onClick={() => window.location.href = '/calculator'}>Full Carbon Calculator</Button>
      </div>
    </div>
  );
}
