import React from 'react';

import { CellType, Table } from '../types/Types';
import Cell from './Cell';

export default class Sdku extends React.PureComponent<SdkuProps> {
    renderRows = (cells: Table) => cells.map(this.renderRow);

    renderRow = (row: CellType[], idx: number) => {
        const cells = row.map((cell, idx) => <Cell key={idx} {...cell}/>);
        return (
            <div key={idx} className="row">
                {cells}
            </div>
        )
    };

    render () {
        return (
            <div className="sdku">
                {this.renderRows(this.props.cells)}
            </div>
        );
    }
}

type SdkuProps = {
    cells: Table
};