import React from 'react';

import { CellType } from '../types/Types';
import Markers from './Markers';

export default class Cell extends React.PureComponent<CellType> {
    renderValue = (value: number) => <Value value={value} />;
    renderMarkers = (markers: number[]) => <Markers markers={markers} />;

    render () {
        const { value, markers } = this.props;

        return (
            <div className="cell">
                {value ? this.renderValue(value) : this.renderMarkers(markers)}
            </div>
        );
    }
}

const Value = ({ value }: any) => <div className="value">{value}</div>;