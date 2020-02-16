export const cell = (value: number, row: number, col: number) => ({
    value: value ? value : undefined,
    markers: [],
    cords: { row, col }
});

export const getCellGroup = (idx: number) => idx < 3 ? 0 : idx < 6 ? 1 : idx < 9 ? 2 : -1;

export const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const parse = (str: string) => str.split('\n')
    .map((line: string) => line.split('').map(
        (c: string) => c !== ' ' ? Number(c) : 0
    ));

export const allCombinations = <T>(arr: T[], length: number) => {
    const results: T[][] = [];

    const combine = (combination: T[], arr: T[], left: number) => {
        if (combination.length === length) {
            results.push(combination);
            return;
        }

        if (arr.length < left) return;

        for (let i = 0; i < arr.length; i++) {
            combine([...combination, arr[i]], arr.slice(i + 1), left - 1);
        }
    };

    combine([], arr, length);

    return results;
};

export const setToArr = <T>(set: Set<T>) => {
    const result: T[] = [];
    set.forEach((val) => result.push(val));
    return result;
};