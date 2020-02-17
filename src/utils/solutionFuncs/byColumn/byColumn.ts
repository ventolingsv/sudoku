import { ExtendedTable, Step } from '../../../types/Types';
import { filterFilledTable } from '../../TableUtils';
import { byAll } from '../byAll';
import { byAllHidden } from '../byAllHidden';
import { byColumnPointer } from './byColumnPointer';

const solveByCol = (table: ExtendedTable, queue: Step[]) => ({
    fn: () => {
        const cols = filterFilledTable(table.cols);
        cols.forEach(
            (col) => colFuncs.forEach(
                (fn: Function) => fn(table, col, queue)
            )
        );
        table.cols.forEach((col, idx) => queue.unshift(byColumnPointer(table, col, queue, idx)));
    },
    name: 'solveByCol'
});

const colFuncs = [byAll, byAllHidden];

export default solveByCol;