import { CellType, ExtendedTable, Step } from '../../../types/Types';
import { byBlockPointer } from './byBlockPointer';
import { byBlockLineReduction } from './byBlockLineReduction';

export const byBlock = (table: ExtendedTable, block: CellType[], queue: Step[], blockIdx: number) => {
    byBlockFuncs.forEach((fn: Function) => queue.unshift(fn(table, block, queue, blockIdx)));
};

const byBlockFuncs = [byBlockPointer, byBlockLineReduction];