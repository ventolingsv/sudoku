import clonedeep from 'lodash.clonedeep';

import { ExtendedTable, Step, CellType } from '../../types/Types';
import { clearMarker } from '../TableUtils';

export const byBlock = (table: ExtendedTable, block: CellType[], queue: Step[], blockIdx: number) => ({
    fn: () => {
        const counts = countBlockNums(block, blockIdx);

        Object.entries(counts).forEach(
            (pointer) => clearByNum(table, pointer, queue, blockIdx)
        )
    },
    name: 'byBlock'
});

const clearByNum = (table: ExtendedTable, pointer: Pointer, queue: Step[], blockIdx: number) => {
    const num = Number(pointer[0]);
    const blockRow = indexToRow(blockIdx);
    const blockCol = indexToCol(blockIdx);

    pointer[1].rows.forEach((row) => {
        const tableRow = table.rows[row];

        tableRow
            .filter((cell, idx) => indexToRow(idx) !== blockCol && cell.markers.includes(num))
            .forEach((cell) => clearMarker(table, cell, num, queue));
    });

    pointer[1].cols.forEach((col) => {
        const tableCol = table.cols[col];

        tableCol
            .filter((_, idx) => indexToRow(idx) !== blockRow)
            .forEach((cell) => clearMarker(table, cell, num, queue));
    });
};

const countBlockNums = (block: CellType[], blockIdx: number) => {
    const counts = block.reduce((acc: BlockCount, cell, idx) => {
        const blockRow = indexToRow(blockIdx) * 3;
        const blockCol = indexToCol(blockIdx) * 3;

        cell.markers.forEach((mrkr) => {
            acc[mrkr] = acc[mrkr] || { rows: {}, cols: {} };

            const rowIdx = indexToRow(idx) + blockRow;
            if (acc[mrkr].rows[rowIdx]) acc[mrkr].rows[rowIdx]++;
            else acc[mrkr].rows[rowIdx] = 1;

            const colIdx = indexToCol(idx) + blockCol;
            if (acc[mrkr].cols[colIdx]) acc[mrkr].cols[colIdx]++;
            else acc[mrkr].cols[colIdx] = 1;
        });
        return acc;
    }, {});

   return Object.entries(counts).reduce((acc: BlockPointer, [num, counts]) => {
       const rows = getSingle(counts.rows);
       const cols = getSingle(counts.cols);

       if (rows.length || cols.length) {
           acc[num] = { rows, cols };
       }

       return acc;
   }, {});
};

const getSingle = (count: ElementCount) => {
    const els = Object.entries(count);
    if (els.length === 1) return [Number(els[0][0])];
    else return [];
};

const indexToRow = (idx: number) => idx < 3 ? 0 : idx < 6 ? 1 : 2;
const indexToCol = (idx: number) => {
    switch(idx) {
        case 0:
        case 3:
        case 6:
            return 0;
        case 1:
        case 4:
        case 7:
            return 1;
        case 2:
        case 5:
        case 8:
            return 2;
        default: return 0;
    }
};

type BlockCount = {
    [key: string]: NumCount
};

type ElementCount = { [key: string] : number };

type NumCount = {
    rows: ElementCount
    cols: ElementCount
};

type BlockPointer = {
    [key: string]: {
        rows: number[],
        cols: number[]
    }
}

type Pointer = [string, { rows: number[], cols: number[] }];