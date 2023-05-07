import { IBoardState } from "@/domain/IBoardState";
import { DebugBoardCell } from "./DebugBoardCell";

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
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    {row.map(cell => (
                        <DebugBoardCell cell={cell} type={type} />)
                    )}
                </div>
            ))}
        </div>
    );
}

