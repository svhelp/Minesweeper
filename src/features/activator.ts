import { GameResult } from "@/domain/GameResult";
import { GameState } from "@/domain/GameState";
import { IBoardState } from "@/domain/IBoardState";

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