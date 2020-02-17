import { CellType, ExtendedTable, Step } from '../../../types/Types';
import { clearMarker } from '../../TableUtils';
import { ElementCount, getSingle, indexToBlock, indexToCol } from '../../Utils';

export const byColumnPointer = (table: ExtendedTable, col: CellType[], queue: Step[], colIdx: number) => ({
   fn: () => {
      const counts = countColNums(col, colIdx);
      Object.entries(counts).forEach(
          (pointer) => clearByNum(table, pointer, queue, colIdx)
      )
   },
   name: 'byColumnPointer'
});

const clearByNum = (table: ExtendedTable, pointer: Pointer, queue: Step[], colIdx: number) => {
   const num = Number(pointer[0]);

   pointer[1].blocks.forEach((block) => {
      const tableBlock = table.blocks[block];
      const blockCol = indexToCol(block);

      tableBlock
          .filter((cell, idx) => indexToCol(idx) + blockCol * 3 !== colIdx && cell.markers.includes(num))
          .forEach((cell) => clearMarker(table, cell, num, queue));
   });
};

const countColNums = (col: CellType[], colIdx: number) => {
   const counts = col.reduce((acc: ColCount, cell, rowIdx) => {
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

type ColCount = {
   [key: string]: NumCount
};

type NumCount = {
   blocks: ElementCount
};

type RowPointer = {
   [key: string]: { blocks: number[] }
}

type Pointer = [string, { blocks: number[] }];