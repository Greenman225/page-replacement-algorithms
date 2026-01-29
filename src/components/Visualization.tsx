import React from 'react';
import type { SimulationResult } from '../algorithms/types';
import { motion } from 'framer-motion';

interface VisualizationProps {
    result: SimulationResult;
}

export const Visualization: React.FC<VisualizationProps> = ({ result }) => {
    return (
        <div className="overflow-x-auto pb-4">
            <div className="min-w-max">
                <div className="flex gap-2 mb-2">
                    <div className="w-24 font-bold text-gray-400">Step</div>
                    {result.steps.map((step) => (
                        <div key={step.step} className="w-12 text-center text-sm text-gray-500">
                            {step.step}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 mb-2">
                    <div className="w-24 font-bold text-gray-400">Reference</div>
                    {result.steps.map((step) => (
                        <div key={step.step} className="w-12 text-center font-bold text-white bg-white/5 rounded">
                            {step.reference}
                        </div>
                    ))}
                </div>

                <div className="flex gap-2 mb-4">
                    <div className="w-24 font-bold text-gray-400 pt-2">Frames</div>
                    {result.steps.map((step) => (
                        <div key={step.step} className="w-12 flex flex-col gap-1">
                            {step.frames.map((page, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`
                    h-12 flex items-center justify-center rounded border font-mono font-medium
                    ${page === null ? 'bg-transparent border-white/5' :
                                            page === step.reference && step.hit ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.3)]' :
                                                page === step.reference && step.fault ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.3)]' :
                                                    'bg-white/5 border-white/10 text-gray-300'}
                  `}
                                >
                                    {page}
                                </motion.div>
                            ))}
                            <div className="h-6 flex items-center justify-center mt-1">
                                {step.fault && <span className="text-[10px] text-red-400 font-bold tracking-wider">MISS</span>}
                                {step.hit && <span className="text-[10px] text-green-400 font-bold tracking-wider">HIT</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
