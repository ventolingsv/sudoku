import { CellType, ExtendedTable, Step } from '../../../types/Types';
import { clearMarker } from '../../TableUtils';
import { ElementCount, getSingle, indexToBlock, indexToRow } from '../../Utils';

export const byRowPointer = (table: ExtendedTable, row: CellType[], queue: Step[], rowIdx: number) => ({
   fn: () => {
      const counts = countRowNums(row, rowIdx);

      Object.entries(counts).forEach(
          (pointer) => clearByNum(table, pointer, queue, rowIdx)
      )
   },
   name: 'byRowPointer'
});

const clearByNum = (table: ExtendedTable, pointer: Pointer, queue: Step[], rowIdx: number) => {
   const num = Number(pointer[0]);

   pointer[1].blocks.forEach((block) => {
      const tableBlock = table.blocks[block];
      const blockRow = indexToRow(block);

      tableBlock
          .filter((cell, idx) => indexToRow(idx) + blockRow * 3 !== rowIdx && cell.markers.includes(num))
          .forEach((cell) => clearMarker(table, cell, num, queue));
   });
};

const countRowNums = (row: CellType[], rowIdx: number) => {
   const counts = row.reduce((acc: RowCount, cell, colIdx) => {
      cell.markers.forEach((mrkr) => {
         const blockId = indexToBlock(rowIdx, colIdx);
         acc[mrkr] = acc[mrkr] || { blocks: {} };

         if (acc[mrkr].blocks[blockId]) acc[mrkr].blocks[blockId]++;
         else acc[mrkr].blocks[blockId] = 1;
      });
      return acc;
   }, {});

   return Object.entries(counts).reduce((acc: RowPointer, [num, counts]) => {
      const blocks = getSingle(counts.blocks);

      if (blocks.length) {
         acc[num] = { blocks };
      }

      return acc;
   }, {});
};

type RowCount = {
   [key: string]: NumCount
};

type NumCount = {
   blocks: ElementCount
};

type RowPointer = {
   [key: string]: { blocks: number[] }
}

type Pointer = [string, { blocks: number[] }];