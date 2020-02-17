import clonedeep from 'lodash.clonedeep';
import { indexToRow, numbers} from './Utils';
import { Table } from '../types/Types';

type CellCords = {
    rowNum: number,
    cellNum: number
}

const indexes = numbers.map((n) => n - 1);

export const markup = (table: Table) => {
    const newTbl: Table = clonedeep(table);
    newTbl.forEach((row, rowIdx) => {
        row.forEach((cell, cellIdx) => {
            if (!cell.value) {
                cell.markers = markupCell(newTbl, rowIdx, cellIdx);
            }
        });
    });

    return newTbl;
};

const markupCell = (table: Table, rowNum: number, cellNum: number) => {
    const cords: CellCords = { rowNum, cellNum };
    return numbers.filter(
        (num) => markupCellFuncs.reduce(
            (acc: boolean, fn: Function) => acc && fn(table, num, cords),
            true
        )
    );
};

const checkRow = (table: Table, num: number, { rowNum }: CellCords) => table[rowNum].every((cell) => cell.value !== num);

const checkColumn = (table: Table, num: number, {cellNum}: CellCords) => table.reduce(
    (acc, row) => acc && row[cellNum].value !== num,
    true
);

const checkBlock = (table: Table, num: number, {rowNum, cellNum}: CellCords) => {
    const rowGroup = indexToRow(rowNum);
    const colGroup = indexToRow(cellNum);

    const rows = indexes.filter((_, idx) => indexToRow(idx) === rowGroup);
    const cols = indexes.filter((_, idx) => indexToRow(idx) === colGroup);

    return rows.reduce(
        (acc, rowNum) => {
            const colReduction: boolean = cols.reduce(
                (acc, colNum) => acc && table[rowNum][colNum].value !== num,
                acc
            );

            return acc && colReduction;
        },
        true
    );
};

const markupCellFuncs: Function[] = [checkRow, checkColumn, checkBlock];