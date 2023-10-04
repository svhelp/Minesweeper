import { GameResult } from "@/domain/GameResult";
import { GameState } from "@/domain/GameState";
import { IBoardState } from "@/domain/IBoardState";
import { ICell } from "@/domain/ICell";

export const onActivateCell = (board: IBoardState, cell: ICell): Partial<IBoardState> | undefined => {
    if (board.state === GameState.Over) {
        return;
    }

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