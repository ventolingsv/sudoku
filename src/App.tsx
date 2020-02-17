import React from 'react';

import Sdku from './components/Sdku';

import './App.css';
import { cell, parse} from './utils/Utils';
import { markup } from './utils/MarkupUtils';
import { solve } from './utils/SolutionUtils';
import { Step, Table } from './types/Types';

const cells = parse(
    '   123   \n      7  \n  8    1 \n    7 56 \n 6     42\n 2   8   \n43      6\n  6 9 8  \n     5  3'
).map(
    (row, rowNum) => row.map(
        (cl, colNum) => cell(cl, rowNum, colNum)
    )
);

const mrkup = markup(cells);

class App extends React.PureComponent<{}, AppState> {
    constructor (props: any) {
        super(props);
        this.state = {};
        solve(mrkup, this.setTable);
    }

    setTable = (table: Table, queue: Step[]) => this.setState({ table, queue });

    renderQueue = (queue: Step[]) => (
        <div className="queue">
            {queue.map((q) => <span>{q.name}</span>)}
        </div>
    );

    render () {
        const { table, queue } = this.state;
        return (
            <div className="App">
                <Sdku cells={mrkup} />
                {table && <Sdku cells={table} />}
                {queue && this.renderQueue(queue)}
            </div>
        );
    }
}

type AppState = {
    table?: Table,
    queue?: Step[]
}

export default App;
