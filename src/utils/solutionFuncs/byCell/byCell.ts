import { ExtendedTable, Step } from '../../../types/Types';
import { tryFillSingleMarker } from '../bySingleMarker';

const solveByCell = (table: ExtendedTable, queue: Step[]) => ({
    fn: () => {
        table.cells.forEach((cell) => tryFillSingleMarker(table, cell, queue));
    },
    name: 'solveByCell'
});

export default solveByCell;