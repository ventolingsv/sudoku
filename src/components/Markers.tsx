import React from 'react';
import { indexToRow, numbers } from '../utils/Utils';

export default class Markers extends React.PureComponent<MarkersProps> {
    renderRow = (row: any[], idx: number) => <div key={idx} className="row">{row}</div>;

    getRows = () => numbers.reduce((acc: any[], num, idx) => {
        const rowIdx = indexToRow(idx);
        const value = this.props.markers.includes(num) ? num : undefined;

        acc[rowIdx] = acc[rowIdx] || [];
        acc[rowIdx].push(<Marker key={value} value={value} />);

        return acc;
    }, []);

    render () {
        const rows = this.getRows().map(this.renderRow);

        return (
            <div className="markers">
                {rows}
            </div>
        );
    }
}

type MarkersProps = {
    markers: number[]
}

const Marker = ({ value }: any) => <div className="marker">{value}</div>;