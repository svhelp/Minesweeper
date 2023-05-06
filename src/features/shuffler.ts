import { IBoardState } from "@/domain/IBoardState"

export const shuffle = (size: number, bombsQty: number) => {
    const board: IBoardState = {
        cells: [ ...Array(size).keys() ].map(x => [ ...Array(size).keys() ].map(y => ({
            isOpen: false,
            isMarked: false,
            isBomb: false,
            bombsAround: 0,
        })))
    }

    const maximumBombs = size * size / 10;
    const bombsQtyConfirmed = bombsQty < maximumBombs ? bombsQty : maximumBombs;

    let bombsPlaced = 0;

    while (bombsPlaced < bombsQtyConfirmed){
        const [ x, y ] = getRandomCell(size);
        const cell = board.cells[x][y];

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
                board.cells[x][y].bombsAround++;
            }
        }
    }

    return board;
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