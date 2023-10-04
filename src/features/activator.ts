import { GameResult } from "@/domain/GameResult";
import { GameState } from "@/domain/GameState";
import { IBoardState } from "@/domain/IBoardState";
import { ICell } from "@/domain/ICell";

const recoursiveActivateCells = (board: IBoardState, openedCells: ICell[], x: number, y: number) => {
    const recoursiveActivateCellsItem = (x1: number, y1: number) => {
        const leftCell = board.cells[x1][y1];

        if (openedCells.includes(leftCell)) {
            return;
        }

        openedCells.push(leftCell);
    
        if (leftCell.bombsAround !== 0) {
            return;
        }

        recoursiveActivateCells(board, openedCells, x1, y1)
    }

    const maxCoordinate = Math.sqrt(board.cellsCount) - 1

    if (x > 0) {
        recoursiveActivateCellsItem(x-1, y);
    }
    
    if (x < maxCoordinate) {
        recoursiveActivateCellsItem(x+1, y);
    }
    
    if (y > 0) {
        recoursiveActivateCellsItem(x, y-1);
    }
    
    if (y < maxCoordinate) {
        recoursiveActivateCellsItem(x, y+1);
    }
}

export const onActivateCell = (board: IBoardState, x: number, y: number): Partial<IBoardState> | undefined => {
    if (board.state === GameState.Over) {
        return;
    }

    const cell = board.cells[x][y];

    if (board.openedCells.includes(cell)) {
        return;
    }

    const openedCells = [ ...board.openedCells, cell ];

    if (cell.isBomb){
        return {
            state: GameState.Over,
            result: GameResult.Lost,
            openedCells: openedCells,
            fatalCell: cell,
        };
    }

    if (cell.bombsAround === 0) {
        recoursiveActivateCells(board, openedCells, x, y);
    }

    const bombsConfirmed = board.cellsCount - board.openedCells.length + 1;

    if (board.bombsCount === bombsConfirmed){
        return {
            state: GameState.Over,
            result: GameResult.Won,
            openedCells: openedCells,
        };
    }

    const patch = {
        openedCells: openedCells,
    } as Partial<IBoardState>;

    if (board.openedCells.length === 0){
        patch.state = GameState.InProgress;
    }

    return patch;
}