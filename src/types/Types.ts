export type CellType = {
    value?: number
    markers: number[],
    cords: {
        row: number
        col: number
    }
};

export type Step = {
    fn: () => void,
    name: string
}

export type Table = CellType[][];

export type ExtendedTable = {
    table: Table,
    cells: CellType[],
    rows: Table,
    cols: Table,
    blocks: Table
};

export type Markers = {
    markers: number[]
    count: number
}