import React from 'react';

import { CellType } from '../types/Types';
import Markers from './Markers';

const Cell = React.memo(({ value, markers}: CellType) => (
    <div className="cell">
        {value ? <Value value={value} /> : <Markers markers={markers} />}
    </div>
));

const Value = ({ value }: any) => <div className="value">{value}</div>;

export default Cell;