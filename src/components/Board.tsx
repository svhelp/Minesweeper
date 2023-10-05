import { IBoardState } from "@/domain/IBoardState";
import { BoardRow } from "./Board.styles";
import { Cell } from "./Cell";

interface IBoardProps {
    board?: IBoardState;
    onOpenCell: (x: number, y: number) => void;
    onMarkCell: (x: number, y: number) => void;
}

export const Board = ({ board, onOpenCell, onMarkCell }: IBoardProps) => {
    if (!board){
        return <div>No board yet.</div>
    }

    return (
        <div>
            {board?.cells.map((row, x) => (
                <BoardRow>
                    {row.map((_, y) => 
                        <Cell board={board} x={x} y={y} onOpenCell={onOpenCell} onMarkCell={onMarkCell} />
                    )}
                </BoardRow>
            ))}
        </div>
    );
}
