import { ExtendedTable, Step } from '../../../types/Types';
import { filterFilledTable } from '../../TableUtils';
import { byAll } from '../byAll';
import { byAllHidden } from '../byAllHidden';

const solveByRow = (table: ExtendedTable, queue: Step[]) => ({
    fn: () => {
        const rows = filterFilledTable(table.rows);
        rows.forEach(
            (row) => byRowFuncs.forEach(
                (fn: Function) => fn(table, row, queue)
            )
        );
    },
    name: 'solveByRow'
});

const byRowFuncs = [byAll, byAllHidden];

export default solveByRow;
