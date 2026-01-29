import { useState } from 'react';
import { SimulationForm } from './components/SimulationForm';
import { Visualization } from './components/Visualization';
import { ComparisonTable } from './components/ComparisonTable';
import { ComparisonChart } from './components/ComparisonChart';
import { fifo } from './algorithms/fifo';
import { lru } from './algorithms/lru';
import { lfu } from './algorithms/lfu';
import { optimal } from './algorithms/optimal';
import { clock } from './algorithms/clock';
import type { SimulationResult } from './algorithms/types';
import { LayoutDashboard, Activity, BarChart3 } from 'lucide-react';

function App() {
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [activeTab, setActiveTab] = useState<'visualize' | 'compare'>('visualize');

  const handleRun = (referenceString: number[], frameCount: number) => {
    const algorithms = [fifo, lru, lfu, optimal, clock];
    const newResults = algorithms.map((algo) => algo.simulate(referenceString, frameCount));
    setResults(newResults);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-cyan-500/30">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0f172a] to-[#0f172a] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto p-8">
        <header className="mb-12 text-center space-y-4">
          <div className="inline-block p-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 mb-4 shadow-2xl">
            <LayoutDashboard className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 tracking-tight">
            Page Replacement Algorithms
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Visualize and compare the performance of FIFO, LRU, LFU, Optimal, and Clock algorithms in real-time.
          </p>
        </header>

        <SimulationForm onRun={handleRun} />

        {results.length > 0 && (
          <div className="space-y-8">
            <div className="flex gap-4 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab('visualize')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'visualize'
                    ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Activity className="w-4 h-4" />
                Visualization
              </button>
              <button
                onClick={() => setActiveTab('compare')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${activeTab === 'compare'
                    ? 'bg-cyan-600 text-white shadow-[0_0_15px_rgba(8,145,178,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <BarChart3 className="w-4 h-4" />
                Comparison
              </button>
            </div>

            {activeTab === 'visualize' ? (
              <div className="space-y-8">
                {results.map((result) => (
                  <div key={result.algorithmName} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-cyan-300 flex items-center gap-2">
                      <LayoutDashboard className="w-5 h-5" />
                      {result.algorithmName}
                    </h3>
                    <Visualization result={result} />
                    <div className="mt-4 flex gap-6 text-sm text-gray-400">
                      <span>Faults: <strong className="text-red-400">{result.totalFaults}</strong></span>
                      <span>Hits: <strong className="text-green-400">{result.totalHits}</strong></span>
                      <span>Hit Rate: <strong className="text-white">{(result.hitRate * 100).toFixed(1)}%</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in duration-500">
                <ComparisonChart results={results} />
                <ComparisonTable results={results} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
