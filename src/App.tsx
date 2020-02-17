import React from 'react';

import Sdku from './components/Sdku';

import './App.css';
import { cell, parse} from './utils/Utils';
import { markup } from './utils/MarkupUtils';
import { solve } from './utils/SolutionUtils';
import { Step, Table } from './types/Types';

const cells = parse(
    '    3   9\n     5 6 \n     75 8\n  6      \n32    6  \n    8  54\n 3  5    \n81 943   \n9    8   '
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
