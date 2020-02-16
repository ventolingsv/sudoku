import React from 'react';
import { getCellGroup, numbers } from '../utils/Utils';

export default class Markers extends React.PureComponent<MarkersProps> {
    renderRow = (row: any[]) => <div className="row">{row}</div>;

    getRows = () => numbers.reduce((acc: any[], num, idx) => {
        const rowIdx = getCellGroup(idx);
        const value = this.props.markers.includes(num) ? num : undefined;

        acc[rowIdx] = acc[rowIdx] || [];
        acc[rowIdx].push(<Marker value={value} />);

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