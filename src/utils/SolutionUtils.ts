import clonedeep from 'lodash.clonedeep';

import { extendTable, isSolved } from './TableUtils';
import { ExtendedTable, Table } from '../types/Types';
import solveByRow from './solutionFuncs/byRow/byRow';
import solveByBlock from './solutionFuncs/byBlock/byBlock';
import solveByCol from './solutionFuncs/byColumn/byColumn';
import solveByCell from './solutionFuncs/byCell/byCell';

const solutionFuncs = [solveByCell, solveByRow, solveByCol, solveByBlock];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const solve = async (table: Table, hook: any) => {
    const newTable: ExtendedTable = extendTable(clonedeep(table));
    const queue: Function[] = [];
    let addedSteps = 0;

    const addSteps = () => solutionFuncs.forEach((fn: Function) => queue.push(fn(newTable, queue)));

    addSteps();
    while((queue.length || !isSolved(newTable)) && addedSteps < 5) {
        if (!queue.length) {
            addSteps();
            addedSteps++;
        }

        await sleep(1);
        const op: any = queue.shift()!!;
        op.fn();
        hook(clonedeep(newTable.table), queue);
    }

    hook(clonedeep(newTable.table), []);

    console.log('addedSteps', addedSteps);
    return newTable.table;
};