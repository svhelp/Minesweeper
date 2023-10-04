import { IBoardState } from "@/domain/IBoardState";
import { ClosedCell, MarkedCell, OpenedCell } from "./Cell.styles";
import { ICell } from "@/domain/ICell";

interface CellProps {
    board: IBoardState;
    cell: ICell;
    onOpenCell: (cell: ICell) => void;
    onMarkCell: (cell: ICell) => void;
}

export const Cell = ({ board, cell, onOpenCell, onMarkCell }: CellProps) => {
    if (board.openedCells.includes(cell)) {
        return <OpenedCell isBomb={cell.isBomb} bombsAround={cell.bombsAround} />;
    }

    if (board.markedCells.includes(cell)) {
        return <MarkedCell />;
    }

    const onRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        onMarkCell(cell);
    };

    return <ClosedCell onClick={() => onOpenCell(cell)} onContextMenu={onRightClick} />;
};
