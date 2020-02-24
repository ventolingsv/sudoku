import React, { useEffect, useState } from 'react';

import Sdku from './components/Sdku';
import { markup } from './utils/MarkupUtils';
import { solve } from './utils/SolutionUtils';
import { Step, Table } from './types/Types';

import './App.css';

const renderQueue = (queue: Step[]) => (
    <div className="queue">
        {queue.map((q) => <span>{q.name}</span>)}
    </div>
);

const App = React.memo(({ cells }: AppProps) => {
    const [{ table, queue }, setInfo] = useState<AppState>({});
    useEffect(() => {
        solve(markup(cells), setInfo);
    }, []);

    return (
        <div className="App">
            {table && <Sdku cells={table} />}
            {queue && renderQueue(queue)}
        </div>
    );
});

type AppProps = {
    cells: Table
}

type AppState = {
    table?: Table
    queue?: Step[]
}

export default App;
