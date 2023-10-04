import { IBoardState } from "@/domain/IBoardState";
import { BoardRow } from "./Board.styles";
import { ICell } from "@/domain/ICell";
import { Cell } from "./Cell";

interface IBoardProps {
    board?: IBoardState;
    onOpenCell: (cell: ICell) => void;
    onMarkCell: (cell: ICell) => void;
}

export const Board = ({ board, onOpenCell, onMarkCell }: IBoardProps) => {
    if (!board){
        return <div>No board yet.</div>
    }

    return (
        <div>
            {board?.cells.map((row, x) => (
                <BoardRow>
                    {row.map((cell, y) => 
                        <Cell board={board} cell={cell} onOpenCell={onOpenCell} onMarkCell={onMarkCell} />
                    )}
                </BoardRow>
            ))}
        </div>
    );
}
