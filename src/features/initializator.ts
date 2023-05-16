import { GameState } from "@/domain/GameState";
import { shuffle } from "./shuffler";
import { IBoardState } from "@/domain/IBoardState";
import { GameResult } from "@/domain/GameResult";

export const createBoard = (size: number, bombs: number) => {
    const maximumBombs = size * size / 10;
    const bombsQtyConfirmed = bombs < maximumBombs ? bombs : maximumBombs;

    const cells = shuffle(size, bombsQtyConfirmed);

    return {
        state: GameState.NotStarted,
        result: GameResult.Undefined,
        cellsCount: size * size,
        bombsCount: bombsQtyConfirmed,
        cells: cells,
        openedCells: [],
        markedCells: [],
    } as IBoardState
}