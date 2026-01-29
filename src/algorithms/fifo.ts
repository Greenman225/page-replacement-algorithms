import type { PageReplacementAlgorithm, SimulationResult, SimulationStep } from "./types";

export const fifo: PageReplacementAlgorithm = {
    name: "FIFO",
    simulate: (referenceString: number[], frameCount: number): SimulationResult => {
        let frames: (number | null)[] = Array(frameCount).fill(null);
        let steps: SimulationStep[] = [];
        let faults = 0;
        let hits = 0;
        let nextToReplace = 0;

        referenceString.forEach((page, index) => {
            let fault = false;
            let hit = false;

            if (frames.includes(page)) {
                hit = true;
                hits++;
            } else {
                fault = true;
                faults++;
                frames[nextToReplace] = page;
                nextToReplace = (nextToReplace + 1) % frameCount;
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
            algorithmName: "FIFO",
            steps,
            totalFaults: faults,
            totalHits: hits,
            hitRate: hits / referenceString.length,
            faultRate: faults / referenceString.length,
        };
    },
};
