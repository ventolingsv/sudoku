import clonedeep from 'lodash.clonedeep';

import { extendTable, isSolved } from './TableUtils';
import { ExtendedTable, Step, Table } from '../types/Types';
import solveByRow from './solutionFuncs/byRow/byRow';
import solveByBlock from './solutionFuncs/byBlock/byBlock';
import solveByCol from './solutionFuncs/byColumn/byColumn';
import solveByCell from './solutionFuncs/byCell/byCell';

const solutionFuncs = [solveByCell, solveByRow, solveByCol, solveByBlock];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const solve = async (table: Table, hook?: (state: any) => void) => {
    const newTable: ExtendedTable = extendTable(clonedeep(table));
    const queue: Step[] = [];
    const updateState = (table: Table, queue: Step[]) => hook && hook({ table: clonedeep(table), queue });
    let addedSteps = 0;

    const addSteps = () => {
        solutionFuncs.forEach((fn: Function) => queue.push(fn(newTable, queue)));
        addedSteps++;
    };

    addSteps();
    while((queue.length || !isSolved(newTable)) && addedSteps < 5) {
        if (!queue.length) addSteps();

        await sleep(1);
        const op: any = queue.shift()!!;
        op.fn();
        updateState(newTable.table, queue);
    }

    updateState(newTable.table, []);
    return newTable.table;
};