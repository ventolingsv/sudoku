import { CellType, ExtendedTable, Step } from '../../../types/Types';
import { clearMarker } from '../../TableUtils';
import { ElementCount, getSingle, indexToCol, indexToRow } from '../../Utils';

export const byBlockPointer = (table: ExtendedTable, block: CellType[], queue: Step[], blockIdx: number) => ({
    fn: () => {
        const counts = countBlockNums(block, blockIdx);

        Object.entries(counts).forEach(
            (pointer) => clearByNum(table, pointer, queue, blockIdx)
        )
    },
    name: 'byBlockPointer'
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
        const rowIdx = indexToRow(idx) + blockRow;
        const colIdx = indexToCol(idx) + blockCol;

        cell.markers.forEach((mrkr) => {
            acc[mrkr] = acc[mrkr] || { rows: {}, cols: {} };

            if (acc[mrkr].rows[rowIdx]) acc[mrkr].rows[rowIdx]++;
            else acc[mrkr].rows[rowIdx] = 1;

            if (acc[mrkr].cols[colIdx]) acc[mrkr].cols[colIdx]++;
            else acc[mrkr].cols[colIdx] = 1;
        });
        return acc;
    }, {});

    return Object.entries(counts).reduce((acc: BlockPointer, [num, counts]) => {
        const rows = getSingle(counts.rows);
        const cols = getSingle(counts.cols);

        if (rows.length || cols.length) {
            acc[num] = {rows, cols};
        }

        return acc;
    }, {});
};

type BlockCount = {
    [key: string]: NumCount
};

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