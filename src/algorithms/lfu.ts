import type { PageReplacementAlgorithm, SimulationResult, SimulationStep } from "./types";

export const lfu: PageReplacementAlgorithm = {
    name: "LFU",
    simulate: (referenceString: number[], frameCount: number): SimulationResult => {
        let frames: (number | null)[] = Array(frameCount).fill(null);
        let steps: SimulationStep[] = [];
        let faults = 0;
        let hits = 0;
        let frequencies: Map<number, number> = new Map();
        let arrivalTimes: Map<number, number> = new Map(); // For FIFO tie-breaking

        referenceString.forEach((page, index) => {
            let fault = false;
            let hit = false;

            if (frames.includes(page)) {
                hit = true;
                hits++;
                frequencies.set(page, (frequencies.get(page) || 0) + 1);
            } else {
                fault = true;
                faults++;

                // Find empty slot
                const emptyIndex = frames.indexOf(null);
                if (emptyIndex !== -1) {
                    frames[emptyIndex] = page;
                    frequencies.set(page, 1);
                    arrivalTimes.set(page, index);
                } else {
                    // Find LFU page
                    let lfuPage = -1;
                    let minFreq = Infinity;
                    let minArrival = Infinity;

                    frames.forEach((p) => {
                        if (p !== null) {
                            const freq = frequencies.get(p) || 0;
                            const arrival = arrivalTimes.get(p) || 0;

                            if (freq < minFreq) {
                                minFreq = freq;
                                minArrival = arrival;
                                lfuPage = p;
                            } else if (freq === minFreq) {
                                // Tie-breaking: FIFO
                                if (arrival < minArrival) {
                                    minArrival = arrival;
                                    lfuPage = p;
                                }
                            }
                        }
                    });

                    const replaceIndex = frames.indexOf(lfuPage);

                    // Reset frequency for evicted page
                    frequencies.delete(lfuPage);
                    arrivalTimes.delete(lfuPage);

                    frames[replaceIndex] = page;
                    frequencies.set(page, 1);
                    arrivalTimes.set(page, index);
                }
            }

            steps.push({
                step: index + 1,
                reference: page,
                frames: [...frames],
                fault,
                hit,
            });
        });

        return {
            algorithmName: "LFU",
            steps,
            totalFaults: faults,
            totalHits: hits,
            hitRate: hits / referenceString.length,
            faultRate: faults / referenceString.length,
        };
    },
};
