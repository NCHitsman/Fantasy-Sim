import { CivAction } from './../types';
import { CivAi } from './CivAi';
import { ParentSimulation } from './Sim';

export const CivActionDecider = (civ: CivAi, sim: ParentSimulation) => {
    console.log('HERE', sim.settlementList);

    return {} as CivAction;
};
