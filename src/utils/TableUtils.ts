import { getCellGroup} from './Utils';
import { CellType, ExtendedTable, Step, Table } from '../types/Types';
import { tryFillSingleMarker } from './solutionFuncs/bySingleMarker';

export const isSolved = (table: ExtendedTable) => {
    const allValuesPopulated = table.cells.every((cell) => cell.value);
    const noRowDups = table.rows.every(noDuplicates);
    const noColDups = table.cols.every(noDuplicates);
    const noBlockDups = table.blocks.every(noDuplicates);

    return allValuesPopulated && noRowDups && noColDups && noBlockDups;
};

export const splitByRow = (table: Table) => [...table];

export const splitByColumn = (table: Table) => table.reduce((acc: Table, row) => {
    row.forEach((cell, idx) => {
        acc[idx] = acc[idx] || [];
        acc[idx].push(cell)
    });

    return acc;
}, []);

export const splitByBlock = (table: Table) => table.reduce((acc: Table, row, rowNum) => {
    row.forEach((cell, colNum) => {
        const blockId = getBlockId(rowNum, colNum);
        acc[blockId] = acc[blockId] || [];
        acc[blockId].push(cell);
    });

    return acc;
}, []);

export const splitByCell = (table: Table) => table.reduce((acc: CellType[], row) => {
    row.forEach((cell) => acc.push(cell));
    return acc;
}, []);

const blockIds = ['00', '01', '02', '10', '11', '12', '20', '21', '22'];
export const getBlockId = (row: number, col: number) => {
    const rowGroup = getCellGroup(row);
    const colGroup = getCellGroup(col);

    return blockIds.indexOf(`${rowGroup}${colGroup}`);
};

const noDuplicates = (arr: CellType[]) => {
    const counts: any[] = [];
    for (let { value } of arr) {
        if (!value) continue;

        if(!counts[value]) {
            counts[value] = 1;
        } else {
            return false;
        }
    }

    return true;
};

export const setValue = (table: ExtendedTable, cell: CellType, value: number, queue: Step[]) => {
    cell.value = value;
    cell.markers = [];
    clearMarkers(table, cell, value, queue);
};

export const extendTable = (table: Table) => {
    const cells = splitByCell(table);
    const rows = splitByRow(table);
    const cols = splitByColumn(table);
    const blocks = splitByBlock(table);

    return { table, cells, rows, cols, blocks };
};

export const clearMarker = (table: ExtendedTable, cell: CellType, value: number, queue: Step[]) => {
    const index = cell.markers.indexOf(value);
    index !== -1 && cell.markers.splice(index, 1);

    tryFillSingleMarker(table, cell, queue);
};

const clearMarkers = (table: ExtendedTable, cell: CellType, value: number, queue: Step[]) => {
    const { row, col } = cell.cords;
    const blockId = getBlockId(row, col);

    const clear = (cell: CellType) => clearMarker(table, cell, value, queue);

    table.rows[cell.cords.row].forEach(clear);
    table.cols[cell.cords.col].forEach(clear);
    table.blocks[blockId].forEach(clear);
};

export const getSingleMarker = ({ markers }: CellType) => {
    if (markers.length !== 1) return undefined;
    else return markers[0];
};

export const filterFilled = (arr: CellType[]) => arr.filter((cell) => cell.markers.length);
export const filterFilledTable = (arr: Table) => arr.map(filterFilled);

export const numCount = (arr: CellType[]) => {
    const nums: any = {};
    const cells = arr.filter((cell) => cell.markers.length);

    cells.forEach((cell) => cell.markers.forEach((mrkr) => {
        if (nums[mrkr]) {
            nums[mrkr]++
        } else {
            nums[mrkr] = 1;
        }
    }));

    return nums;
};