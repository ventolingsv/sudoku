import { ExtendedTable, Step } from '../../../types/Types';
import { filterFilledTable } from '../../TableUtils';
import { byAll } from '../byAll';
import { byAllHidden } from '../byAllHidden';

const solveByCol = (table: ExtendedTable, queue: Step[]) => ({
    fn: () => {
        const cols = filterFilledTable(table.cols);
        cols.forEach(
            (col) => colFuncs.forEach(
                (fn: Function) => fn(table, col, queue)
            )
        );
    },
    name: 'solveByCol'
});

const colFuncs = [byAll, byAllHidden];

export default solveByCol;