import { CellType, ExtendedTable, Step } from '../../types/Types';
import { clearMarker, numCount } from '../TableUtils';
import { locate } from '../Locators';
import { fillSingleMarker } from './bySingleMarker';

export const byAll = (table: ExtendedTable, arr: CellType[], queue: Step[]) => allFns.forEach(
    (fn: Function) => queue.unshift(fn(table, arr, queue))
);

const bySingles = (table: ExtendedTable, arr: CellType[], queue: Step[]) => ({
    fn: () => {
        const nums: any = numCount(arr);
        const cells = arr.filter((cell) => cell.markers.length);

        Object.entries(nums)
            .filter(([, count]) => count === 1)
            .forEach(([marker]) => {
                const value = Number(marker);
                const cell = cells.find((c) => c.markers.includes(value))!;
                queue.unshift(fillSingleMarker(table, cell, queue, value));
            })
    },
    name: 'bySingles'
});

export const byPairs = (table: ExtendedTable, arr: CellType[], queue: Step[]) => ({
    fn: () => byN(table, arr, queue, 2),
    name: 'byPairs'
});
const byTriples = (table: ExtendedTable, arr: CellType[], queue: Step[]) => ({
    fn: () => byN(table, arr, queue, 3),
    name: 'byTriples'
});

const byQuads = (table: ExtendedTable, arr: CellType[], queue: Step[]) => ({
    fn: () => byN(table, arr, queue, 4),
    name: 'byQuads'
});

const byN = (table: ExtendedTable, arr: CellType[], queue: Step[], length: number) => {
    const ns = locate(arr, length);

    if (!ns.length) return;

    const cells = arr.filter((cell) => cell.markers.length);

    ns.forEach((markers) => {
        cells.forEach((cell) => {
            if (!cell.markers.every((mrkr) => markers.includes(mrkr))) {
                markers.forEach((marker) => clearMarker(table, cell, marker, queue))
            }
        })
    });
};

const allFns = [byQuads, byTriples, byPairs, bySingles];