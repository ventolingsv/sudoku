import { ExtendedTable, Step, CellType } from '../../types/Types';
import { getSingleMarker, setValue } from '../TableUtils';

export const tryFillSingleMarker = (table: ExtendedTable, cell: CellType, queue: Step[]) => {
    const marker = getSingleMarker(cell);
    if (marker && !cell.value) {
        queue.unshift(fillSingleMarker(table, cell, queue, marker));
    }
};

export const fillSingleMarker = (table: ExtendedTable, cell: CellType, queue: any[], marker: number) => ({
    fn: () => setValue(table, cell, marker, queue),
    name: 'fillSingleMarker'
});