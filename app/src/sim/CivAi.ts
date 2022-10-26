import { nameByRace } from 'fantasy-name-generator';
import { civAiRaces } from '../constants';
import { CivAction } from '../types';
import { CivActionDecider } from './CivActionLogic';
import { ParentSimulation } from './Sim';

export class CivAi {
    name: string = '';
    gender: 'male' | 'female' | '' = '';
    race: string = '';
    occupied: boolean = false;
    currentAction: CivAction | null = null;

    constructor() {
        this.gender = Math.random() > 0.5 ? 'male' : 'female';
        this.race = civAiRaces[Math.floor(Math.random() * civAiRaces.length)];
        this.name = nameByRace(this.race, {
            gender: this.gender,
            allowMultipleNames: true,
        }) as string;
    }

    setAction(sim: ParentSimulation) {
        this.currentAction = CivActionDecider(this, sim);
    }
}
