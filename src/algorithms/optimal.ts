import type { PageReplacementAlgorithm, SimulationResult, SimulationStep } from "./types";

export const optimal: PageReplacementAlgorithm = {
    name: "Optimal",
    simulate: (referenceString: number[], frameCount: number): SimulationResult => {
        let frames: (number | null)[] = Array(frameCount).fill(null);
        let steps: SimulationStep[] = [];
        let faults = 0;
        let hits = 0;

        referenceString.forEach((page, index) => {
            let fault = false;
            let hit = false;

            if (frames.includes(page)) {
                hit = true;
                hits++;
            } else {
                fault = true;
                faults++;

                // Find empty slot
                const emptyIndex = frames.indexOf(null);
                if (emptyIndex !== -1) {
                    frames[emptyIndex] = page;
                } else {
                    // Find Optimal page to replace
                    let optimalPage = -1;
                    let maxDistance = -1;

                    // We need to check all frames to find the one with max distance
                    // If we find one that is never used again (Infinity), we can pick it immediately?
                    // Actually, let's just iterate all and find the max.

                    for (const p of frames) {
                        if (p !== null) {
                            let nextUse = -1;
                            for (let i = index + 1; i < referenceString.length; i++) {
                                if (referenceString[i] === p) {
                                    nextUse = i;
                                    break;
                                }
                            }

                            if (nextUse === -1) {
                                optimalPage = p;
                                break; // Found a page that is never used again, replace it.
                            } else {
                                if (nextUse > maxDistance) {
                                    maxDistance = nextUse;
                                    optimalPage = p;
                                }
                            }
                        }
                    }

                    const replaceIndex = frames.indexOf(optimalPage);
                    frames[replaceIndex] = page;
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
            algorithmName: "Optimal",
            steps,
            totalFaults: faults,
            totalHits: hits,
            hitRate: hits / referenceString.length,
            faultRate: faults / referenceString.length,
        };
    },
};
