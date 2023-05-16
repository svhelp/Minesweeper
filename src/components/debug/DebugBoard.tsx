import { IBoardState } from "@/domain/IBoardState";
import { DebugBoardCell } from "./DebugBoardCell";
import { BoardRow } from "../Board.styles";

export enum DebugBoardType {
    Bomb,
    Opened,
    Marked,
    BobmsAround,
}

interface DebugBoard {
    board?: IBoardState;
    type: DebugBoardType;
}

export const DebugBoard = ({board, type}: DebugBoard) => {
    if (!board){
        return <div>No board to debug.</div>
    }
    
    return (
        <div>
            {board.cells.map(row => (
                <BoardRow>
                    {row.map(cell => (
                        <DebugBoardCell board={board} cell={cell} type={type} />)
                    )}
                </BoardRow>
            ))}
        </div>
    );
}

