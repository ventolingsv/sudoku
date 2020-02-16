import { ExtendedTable, Step, CellType } from '../../types/Types';
import { locateHidden } from '../Locators';
import { clearMarker } from '../TableUtils';

export const byAllHidden = (table: ExtendedTable, arr: CellType[], queue: Step[]) => allFns.forEach(
    (fn: Function) => queue.unshift(fn(table, arr, queue))
);

const byHiddenPairs = (table: ExtendedTable, arr: CellType[], queue: Step[]) => ({
    fn: () => byHiddenN(table, arr, queue, 2),
    name: 'byHiddenPairs'
});

const byHiddenTriples = (table: ExtendedTable, arr: CellType[], queue: Step[]) => ({
    fn: () => byHiddenN(table, arr, queue, 3),
    name: 'byHiddenTriples'
});

const byHiddenQuads = (table: ExtendedTable, arr: CellType[], queue: Step[]) => ({
    fn: () => byHiddenN(table, arr, queue, 4),
    name: 'byHiddenQuads'
});

const byHiddenN = (table: ExtendedTable, arr: CellType[], queue: Step[], length: number) => {
    const ns = locateHidden(arr, length);

    if (!ns.length) return;

    const cells = arr.filter((cell) => cell.markers.length);

    ns.forEach((markers) => {
        cells
            .filter((cell) => markers.every((m) => cell.markers.includes(m)))
            .forEach((cell) => {
                cell.markers
                    .filter((m) => !markers.includes(m))
                    .forEach((m) => clearMarker(table, cell, m, queue));
            })
    });
};

const allFns = [byHiddenQuads, byHiddenTriples, byHiddenPairs];