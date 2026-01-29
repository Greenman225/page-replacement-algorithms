import React from 'react';
import type { SimulationResult } from '../algorithms/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComparisonChartProps {
    results: SimulationResult[];
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({ results }) => {
    const data = results.map(r => ({
        name: r.algorithmName,
        Faults: r.totalFaults,
        Hits: r.totalHits,
    }));

    return (
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-6 h-[400px]">
            <h3 className="text-xl font-semibold text-white mb-4">Performance Comparison</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    />
                    <Legend />
                    <Bar dataKey="Faults" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Hits" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
