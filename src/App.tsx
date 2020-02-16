import React from 'react';

import Sdku from './components/Sdku';

import './App.css';
import { cell, parse} from './utils/Utils';
import { markup } from './utils/MarkupUtils';
import { solve } from './utils/SolutionUtils';
import { Step, Table } from './types/Types';

const cells = parse(
    '   1   9 \n7     126\n2   4    \n 4       \n5 8  29  \n     82 5\n9    7   \n 5 3  7  \n      81 '
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
