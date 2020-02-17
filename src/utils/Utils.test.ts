import { cell, parse } from './Utils';
import { solve } from './SolutionUtils';
import { markup } from './MarkupUtils';

const cells = parse(
    '   1   9 \n7     126\n2   4    \n 4       \n5 8  29  \n     82 5\n9    7   \n 5 3  7  \n      81 '
).map(
    (row, rowNum) => row.map(
        (cl, colNum) => cell(cl, rowNum, colNum)
    )
);

describe('Utils', () => {
   test('markup', async () => {
       await solve(markup(cells), () => {});
   });
});
