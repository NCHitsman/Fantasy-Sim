import { SettlementEconomy } from '../types';

export class Settlement {
    name: string = '';
    size: string = 'md';
    economy: SettlementEconomy | null = null;
    connectionSettlements: Settlement[] = [];

    constructor(name: string, size: string, connections: Settlement[]) {
        this.name = name;
        this.size = size;
        this.connectionSettlements = connections;
    }
}
