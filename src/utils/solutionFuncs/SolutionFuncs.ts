import { filterFilledTable } from '../TableUtils';
import { byAll } from './byAll';
import { tryFillSingleMarker } from './bySingleMarker';
import { byAllHidden } from './byAllHidden';
import { ExtendedTable, Step } from '../../types/Types';
import { byBlock } from './byBlock/byBlock';

export const solveByCell = (table: ExtendedTable, queue: Step[]) => ({
    fn: () => {
        table.cells.forEach((cell) => tryFillSingleMarker(table, cell, queue));
    },
    name: 'solveByCell'
});

export const solveByRow = (table: ExtendedTable, queue: Step[]) => ({
    fn: () => {
        const rows = filterFilledTable(table.rows);
        rows.forEach((row) => {
            byAll(table, row, queue);
            byAllHidden(table, row, queue);
        });
    },
    name: 'solveByRow'
});

export const solveByCol = (table: ExtendedTable, queue: Step[]) => ({
    fn: () => {
        const cols = filterFilledTable(table.cols);
        cols.forEach((col) => {
            byAll(table, col, queue);
            byAllHidden(table, col, queue);
        });
    },
    name: 'solveByCol'
});

export const solveByBlock = (table: ExtendedTable, queue: Step[]) => ({
    fn: () => {
        const blocks = filterFilledTable(table.blocks);
        blocks.forEach((block) => {
            byAll(table, block, queue);
            byAllHidden(table, block, queue);
        });
        table.blocks.forEach((block, idx) => byBlock(table, block, queue, idx));
    },
    name: 'solveByBlock'
});