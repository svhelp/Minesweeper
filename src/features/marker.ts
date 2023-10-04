import { GameResult } from "@/domain/GameResult";
import { GameState } from "@/domain/GameState";
import { IBoardState } from "@/domain/IBoardState";
import { ICell } from "@/domain/ICell";

export const handleMarkCell = (board: IBoardState, cell: ICell): Partial<IBoardState> | undefined => {
    if (board.state === GameState.Over) {
        return;
    }

    if (board.openedCells.includes(cell)) {
        return;
    }

    const markedCells = board.markedCells.includes(cell)
        ?   board.markedCells.filter(c => c !== cell)
        : [ ...board.markedCells, cell ];

    const patch = {
        markedCells: markedCells,
    } as Partial<IBoardState>;

    if (board.markedCells.length === 0){
        patch.state = GameState.InProgress;
    }

    const allBombsMarked = markedCells.length === board.bombsCount && markedCells.every(cell => cell.isBomb);

    if (allBombsMarked){
        patch.state = GameState.Over;
        patch.result = GameResult.Won;
    }

    return patch;
}