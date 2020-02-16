import { CellType, Markers } from '../types/Types';
import { allCombinations, setToArr } from './Utils';
import { numCount } from './TableUtils';

export const locate = (arr: CellType[], length: number) => {
    const cells = arr.filter((cell) => cell.markers.length && cell.markers.length <= length);
    const allMarkers = setToArr(new Set(
        cells.reduce((acc: number[], cell) => [...acc, ...cell.markers], [])
    ));

    return countMarkers(allMarkers, cells, length, false);
};

export const locateHidden = (arr: CellType[], length: number) => {
    const cells = arr.filter((cell) => cell.markers.length);
    const nums = Object.entries(numCount(arr))
        .filter(([, count]) => count === length)
        .map(([key]) => Number(key));

    const allMarkers = setToArr<number>(new Set(
        cells.reduce((acc: number[], cell) => [...acc, ...cell.markers], [])
    )).filter((m) => nums.includes(m));

    return countMarkers(allMarkers, cells, length, true);
};

const countMarkers = (allMarkers: number[], cells: CellType[], length: number, hidden: boolean, ) => {
    const combinations: MarkersMap = allCombinations(allMarkers, length)
        .reduce((acc: any, markers) => {
            const combinationId = markers.join('');
            acc[combinationId] = { markers, count: 0 };
            return acc;
        }, {});

    cells.forEach((cell) => {
        Object.entries(combinations)
            .forEach(([id, body]: any) => {
                const markers1 = hidden ? body.markers : cell.markers;
                const markers2 = hidden ? cell.markers : body.markers;

                if (markers1.every((mrkr: number) => markers2.includes(mrkr))) {
                    combinations[id].count++;
                }
            })
    });

    return Object.values(combinations)
        .filter((v: Markers) => v.count === length)
        .map((v: Markers) => v.markers);
};

type MarkersMap = { [key: string]: Markers };