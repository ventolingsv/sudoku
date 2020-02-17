import { ExtendedTable, Step } from '../../../types/Types';
import { filterFilledTable } from '../../TableUtils';
import { byAll } from '../byAll';
import { byAllHidden } from '../byAllHidden';
import { byRowPointer } from './byRowPointer';

const solveByRow = (table: ExtendedTable, queue: Step[]) => ({
    fn: () => {
        const rows = filterFilledTable(table.rows);
        rows.forEach(
            (row) => byRowFuncs.forEach(
                (fn: Function) => fn(table, row, queue)
            )
        );
        table.rows.forEach((row, idx) => queue.unshift(byRowPointer(table, row, queue, idx)));
    },
    name: 'solveByRow'
});

const byRowFuncs = [byAll, byAllHidden];

export default solveByRow;
