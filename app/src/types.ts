export interface SimSettings {
    aiCount: number;
}

export interface CivAction {}

export interface SettlementEconomy {
    exports: {
        [key: string]: {};
    };
    imports: {
        [key: string]: {};
    };
}
