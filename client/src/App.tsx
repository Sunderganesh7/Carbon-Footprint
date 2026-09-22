import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const Landing = lazy(() =>
  import('./pages/Landing').then((m) => ({ default: m.Landing })),
);
const Dashboard = lazy(() =>
  import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })),
);
const Calculator = lazy(() =>
  import('./pages/Calculator').then((m) => ({ default: m.Calculator })),
);
const Simulator = lazy(() =>
  import('./pages/Simulator').then((m) => ({ default: m.Simulator })),
);
const AICoach = lazy(() =>
  import('./pages/AICoach').then((m) => ({ default: m.AICoach })),
);
const Challenges = lazy(() =>
  import('./pages/Challenges').then((m) => ({ default: m.Challenges })),
);
const PlasticFootprint = lazy(() =>
  import('./pages/PlasticFootprint').then((m) => ({ default: m.PlasticFootprint })),
);
const EventPlanner = lazy(() =>
  import('./pages/EventPlanner').then((m) => ({ default: m.EventPlanner })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/ai-coach" element={<AICoach />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/plastic-footprint" element={<PlasticFootprint />} />
              <Route path="/event-planner" element={<EventPlanner />} />
              <Route
                path="*"
                element={
                  <div className="flex min-h-[400px] flex-col items-center justify-center">
                    <h1 className="mb-2 text-4xl font-bold text-slate-800">
                      404
                    </h1>
                    <p className="text-slate-500">Page not found</p>
                  </div>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
