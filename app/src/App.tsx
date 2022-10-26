import { useState } from 'react';
import SimForm from './components/SimForm';
import { ParentSimulation } from './sim/Sim';

function App() {
    const [simOn, setSimOn] = useState<boolean>(false);
    const [parentSim, setParentSim] = useState<ParentSimulation | null>(null);

    const stopSim = () => {
        parentSim?.StopSim();
        setSimOn(false);
    };

    return (
        <>
            {!simOn && <SimForm setSimOn={setSimOn} setParentSim={setParentSim}></SimForm>}
            {simOn && <button onClick={stopSim}>Stop Sim</button>}
        </>
    );
}

export default App;
