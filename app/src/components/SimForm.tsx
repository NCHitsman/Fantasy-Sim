import { useState } from 'react';
import { SimSettings } from '../types';
import { ParentSimulation } from '../sim/Sim';
import { Settlement } from '../sim/Settlement';

interface props {
    setSimOn: React.Dispatch<React.SetStateAction<boolean>>;
    setParentSim: React.Dispatch<React.SetStateAction<ParentSimulation | null>>;
}

function SimForm({ setSimOn, setParentSim }: props) {
    const [aiCount, setAiCount] = useState<string | null>(null);
    const [settlements, setSettlements] = useState<Settlement[]>([]);
    const [currentSettlementName, setCurrentSettlementName] = useState<string>('');
    const [currentSettlementSize, setCurrentSettlementSize] = useState<string>('md');
    const [currentSettlementConnections, setCurrentSettlementConnections] = useState<{ [key: string]: Settlement }>({});

    const startSim = () => {
        setSimOn(true);
        let simSettings: SimSettings = {
            aiCount: aiCount ? +aiCount : 0,
        };
        let parentSim = new ParentSimulation(simSettings, settlements);
        setParentSim(parentSim);
        console.log('BEGINNING SIMULATION INITIALIZATION');
        parentSim.StartSim();
        console.log('FINISHED SIMULATION INITIALIZATION');
    };

    const setSettlementConnection = (e: React.ChangeEvent<HTMLInputElement>, s: Settlement) => {
        if (e.target.checked) {
            setCurrentSettlementConnections({ ...currentSettlementConnections, [s.name]: s });
        } else {
            delete currentSettlementConnections[s.name];
            setCurrentSettlementConnections({ ...currentSettlementConnections });
        }
    };

    const createSettlement = () => {
        const settlement = new Settlement(
            currentSettlementName,
            currentSettlementSize,
            Object.values(currentSettlementConnections),
        );
        for (let s of Object.values(currentSettlementConnections)) {
            s.connectionSettlements.push(settlement);
        }
        setSettlements([...settlements, settlement]);
        setCurrentSettlementName('');
        setCurrentSettlementSize('md');
        setCurrentSettlementConnections({});
    };

    return (
        <div className="SimForm">
            <div>
                <label>Ai Count:</label>
                <input value={aiCount || ''} onChange={(e) => setAiCount(e.target.value)} type="number"></input>
            </div>
            <div>Settlements:</div>
            {settlements.map((s, i) => (
                <div key={i}>
                    <div>Name: {s.name}</div>
                    <div>Size: {s.size}</div>
                    <div>
                        Connected Settlements:
                        {s.connectionSettlements.map((connection) => {
                            return (
                                <>
                                    <div>{connection.name}</div>
                                </>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div>
                <label>Name</label>
                <input
                    value={currentSettlementName}
                    onChange={(e) => setCurrentSettlementName(e.target.value)}
                    type="text"
                ></input>

                <label>Size</label>
                <select value={currentSettlementSize} onChange={(e) => setCurrentSettlementSize(e.target.value)}>
                    <option value="sm">Small</option>
                    <option value="md">Medium</option>
                    <option value="lg">Large</option>
                </select>

                {settlements.map((s, i) => (
                    <div key={i}>
                        <label>{s.name}</label>
                        <input onChange={(e) => setSettlementConnection(e, s)} type="checkbox"></input>
                    </div>
                ))}

                <button onClick={createSettlement} disabled={currentSettlementName ? false : true}>
                    Create Settlement
                </button>
            </div>

            <button onClick={startSim} disabled={aiCount ? false : true}>
                Start Simulation
            </button>
        </div>
    );
}

export default SimForm;
