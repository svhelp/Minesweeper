import { GameResult } from "./GameResult";
import { GameState } from "./GameState";
import { ICell } from "./ICell";

export interface IBoardState {
    state: GameState;
    result: GameResult;
    cellsCount: number;
    bombsCount: number;
    cells: ICell[][];
    openedCells: ICell[];
    markedCells: ICell[];
    fatalCell?: ICell;
}