import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

interface SimulationFormProps {
    onRun: (referenceString: number[], frameCount: number) => void;
}

export const SimulationForm: React.FC<SimulationFormProps> = ({ onRun }) => {
    const [referenceInput, setReferenceInput] = useState('7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1');
    const [frameCount, setFrameCount] = useState(3);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const referenceString = referenceInput
            .split(',')
            .map((s) => parseInt(s.trim()))
            .filter((n) => !isNaN(n));

        if (referenceString.length === 0) {
            alert('Please enter a valid reference string');
            return;
        }

        onRun(referenceString, frameCount);
    };

    const generateRandom = () => {
        const length = 20;
        const maxPage = 9;
        const randomString = Array.from({ length }, () => Math.floor(Math.random() * (maxPage + 1)));
        setReferenceInput(randomString.join(', '));
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-6 mb-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Reference String (comma separated)
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={referenceInput}
                            onChange={(e) => setReferenceInput(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white transition-all"
                            placeholder="e.g., 7, 0, 1, 2, 0, 3..."
                        />
                        <button
                            type="button"
                            onClick={generateRandom}
                            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
                            title="Generate Random"
                        >
                            <RotateCcw className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Number of Frames
                    </label>
                    <input
                        type="number"
                        min={1}
                        max={10}
                        value={frameCount}
                        onChange={(e) => setFrameCount(parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white transition-all"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20"
            >
                <Play className="w-5 h-5" />
                Run Simulation
            </button>
        </form>
    );
};
