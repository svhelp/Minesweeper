import { ICell } from "@/domain/ICell";

export const shuffle = (size: number, bombsQty: number) => {
    const cells = [ ...Array(size).keys() ].map(x => [ ...Array(size).keys() ].map(y => ({
            isBomb: false,
            bombsAround: 0,
        }) as ICell))

    let bombsPlaced = 0;

    while (bombsPlaced < bombsQty){
        const [ x, y ] = getRandomCell(size);
        const cell = cells[x][y];

        if (cell.isBomb){
            continue;
        }

        cell.isBomb = true;
        bombsPlaced++;

        const affectedCells = [
            confirmBoardedValue(size, x - 1),
            confirmBoardedValue(size, x + 1),
            confirmBoardedValue(size, y - 1),
            confirmBoardedValue(size, y + 1),
        ]

        for (let x = affectedCells[0]; x < affectedCells[1] + 1; x++){
            for (let y = affectedCells[2]; y < affectedCells[3] + 1; y++){
                cells[x][y].bombsAround++;
            }
        }
    }

    return cells;
}

const confirmBoardedValue = (size: number, value: number) => {
    if (value < 0){
        return 0;
    }

    const max = size - 1;
    if (value > max) {
        return max;
    }

    return value;
}

const getRandomCell = (size: number) => [ getRandomInt(size), getRandomInt(size) ];

const getRandomInt = (max: number) => Math.floor(Math.random() * max);