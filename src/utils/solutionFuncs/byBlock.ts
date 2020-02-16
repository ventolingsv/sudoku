import { ExtendedTable, Step, CellType } from '../../types/Types';

export const byBlock = (table: ExtendedTable, block: CellType[], queue: Step[], blockIdx: number) => ({
    fn: () => {
        const counts = countBlockNums(block, blockIdx);
        console.log(counts);
    },
    name: 'byBlock'
});

const handle = (table: ExtendedTable, el: BlockElement, nums: number[], queue: Step[]) => {

};

const filterPointers = (counts: BlockCount) => {
    counts.nums.forEach((num) => {

    })
};

const countBlockNums = (block: CellType[], blockIdx: number) => block.reduce((acc: BlockCount, cell, idx) => {
    const blockRow = indexToRow(blockIdx) * 3;
    const blockCol = indexToCol(blockIdx) * 3;

    cell.markers.forEach((mrkr) => {
        if (!acc.nums.includes(mrkr)) acc.nums.push(mrkr);

        const rowIdx = indexToRow(idx) + blockRow;
        acc.row[rowIdx] = acc.row[rowIdx] || {};
        if (acc.row[rowIdx][mrkr]) acc.row[rowIdx][mrkr]++;
        else acc.row[rowIdx][mrkr] = 1;

        const colIdx = indexToCol(idx) + blockCol;
        acc.col[colIdx] = acc.col[colIdx] || {};
        if (acc.col[colIdx][mrkr]) acc.col[colIdx][mrkr]++;
        else acc.col[colIdx][mrkr] = 1;
    });
    return acc;
}, { row: {}, col: {}, nums: [] });

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
    nums: number[],
    row: BlockElement,
    col: BlockElement
}

type BlockElement = { [key: string]: { [key: string] : number } };