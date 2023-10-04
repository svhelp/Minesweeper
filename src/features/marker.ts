import { GameResult } from "@/domain/GameResult";
import { GameState } from "@/domain/GameState";
import { IBoardState } from "@/domain/IBoardState";

export const handleMarkCell = (board: IBoardState, x: number, y: number): Partial<IBoardState> | undefined => {
    if (board.state === GameState.Over) {
        return;
    }

    const cell = board.cells[x][y];

    if (board.openedCells.includes(cell)) {
        return;
    }

    const markedCells = board.markedCells.includes(cell)
        ? board.markedCells.filter(c => c !== cell)
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