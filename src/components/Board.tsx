import { IBoardState } from "@/domain/IBoardState";
import { BoardRow } from "./Board.styles";
import { ClosedCell, OpenedCell } from "./Cell.styles";

interface IBoardProps {
    board?: IBoardState;
    onOpenCell: (x: number, y: number) => void;
}

export const Board = ({ board, onOpenCell }: IBoardProps) => {
    if (!board){
        return <div>No board yet.</div>
    }

    return (
        <div>
            {board?.cells.map((row, x) => (
                <BoardRow>
                    {row.map((cell, y) => 
                        cell.isOpen
                            ? <OpenedCell isBomb={cell.isBomb} bombsAround={cell.bombsAround} />
                            : <ClosedCell onClick={() => onOpenCell(x, y)} />
                    )}
                </BoardRow>
            ))}
        </div>
    );
}

