import {  ExtendedTable, Step } from '../../../types/Types';
import { byBlockPointer } from './byBlockPointer';
import { filterFilledTable } from '../../TableUtils';
import { byAll } from '../byAll';
import { byAllHidden } from '../byAllHidden';

const solveByBlock = (table: ExtendedTable, queue: Step[]) => ({
    fn: () => {
        const blocks = filterFilledTable(table.blocks);
        blocks.forEach(
            (block) => byBlockFuncs.forEach(
                (fn: Function) => fn(table, block, queue)
            )
        );
        table.blocks.forEach((block, idx) => byBlockPointer(table, block, queue, idx));
    },
    name: 'solveByBlock'
});

const byBlockFuncs = [byAll, byAllHidden];

export default solveByBlock;