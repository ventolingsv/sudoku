import { cell, parse } from './Utils';
import { solve } from './SolutionUtils';
import { markup } from './MarkupUtils';

const cells = parse(
    ' 23 7 68 \n 8      4\n74 5    9\n    1    \n95 6 7   \n638 5 1  \n8  3   2 \n 9   6   \n   8  4  '
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
