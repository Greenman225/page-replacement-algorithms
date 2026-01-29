import type { PageReplacementAlgorithm, SimulationResult, SimulationStep } from "./types";

export const clock: PageReplacementAlgorithm = {
    name: "Clock",
    simulate: (referenceString: number[], frameCount: number): SimulationResult => {
        let frames: (number | null)[] = Array(frameCount).fill(null);
        let useBits: boolean[] = Array(frameCount).fill(false);
        let steps: SimulationStep[] = [];
        let faults = 0;
        let hits = 0;
        let pointer = 0;

        referenceString.forEach((page, index) => {
            let fault = false;
            let hit = false;

            const existingIndex = frames.indexOf(page);
            if (existingIndex !== -1) {
                hit = true;
                hits++;
                useBits[existingIndex] = true;
            } else {
                fault = true;
                faults++;

                // Find page to replace
                while (true) {
                    if (frames[pointer] === null) {
                        // Empty slot found
                        frames[pointer] = page;
                        useBits[pointer] = true;
                        pointer = (pointer + 1) % frameCount;
                        break;
                    }

                    if (useBits[pointer]) {
                        useBits[pointer] = false;
                        pointer = (pointer + 1) % frameCount;
                    } else {
                        // Found victim
                        frames[pointer] = page;
                        useBits[pointer] = true;
                        pointer = (pointer + 1) % frameCount;
                        break;
                    }
                }
            }

            steps.push({
                step: index + 1,
                reference: page,
                frames: [...frames],
                fault,
                hit,
                algorithmState: { pointer, useBits: [...useBits] },
            });
        });

        return {
            algorithmName: "Clock",
            steps,
            totalFaults: faults,
            totalHits: hits,
            hitRate: hits / referenceString.length,
            faultRate: faults / referenceString.length,
        };
    },
};
