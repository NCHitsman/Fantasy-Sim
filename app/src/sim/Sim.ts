import { SimSettings } from '../types';
import { CivAi } from './CivAi';
import { Settlement } from './Settlement';

export class ParentSimulation {
    simSettings: SimSettings | null = null;
    simIntervalId: NodeJS.Timer | null = null;
    civList: CivAi[] = [];
    tickRate: number = 32;
    count: number = 0;
    settlementList: Settlement[] = [];

    constructor(simSettings: SimSettings, settmentList: Settlement[]) {
        this.tickRate = process.env.TICK_RATE ? +process.env.TICK_RATE : 32;
        this.simSettings = simSettings;
        this.settlementList = settmentList;
    }

    StartSim = () => {
        this.CreateCivs();
        this.simIntervalId = setInterval(this.SimTick, 1000 / this.tickRate);
    };

    StopSim = () => {
        if (this.simIntervalId) {
            clearInterval(this.simIntervalId);
        }
    };

    CreateCivs = () => {
        if (this.simSettings) {
            for (let i = 0; i < this.simSettings.aiCount; i++) {
                this.civList.push(new CivAi());
            }
        }
    };

    SimTick = () => {
        console.log(this.count++);

        for (let civ of this.civList) {
            if (!civ.occupied) {
                civ.setAction(this);
            }
        }
    };
}
