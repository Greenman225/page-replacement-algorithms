import React from 'react';
import type { SimulationResult } from '../algorithms/types';

interface ComparisonTableProps {
    results: SimulationResult[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ results }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-white/5">
                    <tr>
                        <th className="p-4 font-semibold text-gray-300">Algorithm</th>
                        <th className="p-4 font-semibold text-gray-300">Total Faults</th>
                        <th className="p-4 font-semibold text-gray-300">Total Hits</th>
                        <th className="p-4 font-semibold text-gray-300">Fault Rate</th>
                        <th className="p-4 font-semibold text-gray-300">Hit Rate</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {results.map((result) => (
                        <tr key={result.algorithmName} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-medium text-white">{result.algorithmName}</td>
                            <td className="p-4 text-red-400 font-bold">{result.totalFaults}</td>
                            <td className="p-4 text-green-400 font-bold">{result.totalHits}</td>
                            <td className="p-4 text-gray-300">{(result.faultRate * 100).toFixed(1)}%</td>
                            <td className="p-4 text-gray-300">{(result.hitRate * 100).toFixed(1)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
