import type { PageReplacementAlgorithm, SimulationResult, SimulationStep } from "./types";

export const lru: PageReplacementAlgorithm = {
    name: "LRU",
    simulate: (referenceString: number[], frameCount: number): SimulationResult => {
        let frames: (number | null)[] = Array(frameCount).fill(null);
        let steps: SimulationStep[] = [];
        let faults = 0;
        let hits = 0;
        let lastUsed: Map<number, number> = new Map();

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
                    // Find LRU page
                    let lruPage = -1;
                    let minLastUsed = Infinity;

                    frames.forEach((p) => {
                        if (p !== null) {
                            const last = lastUsed.get(p) ?? -1;
                            if (last < minLastUsed) {
                                minLastUsed = last;
                                lruPage = p;
                            }
                        }
                    });

                    const replaceIndex = frames.indexOf(lruPage);
                    frames[replaceIndex] = page;
                }
            }

            // Update last used time for the current page
            lastUsed.set(page, index);

            steps.push({
                step: index + 1,
                reference: page,
                frames: [...frames],
                fault,
                hit,
            });
        });

        return {
            algorithmName: "LRU",
            steps,
            totalFaults: faults,
            totalHits: hits,
            hitRate: hits / referenceString.length,
            faultRate: faults / referenceString.length,
        };
    },
};
