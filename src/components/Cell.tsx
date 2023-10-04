import { IBoardState } from "@/domain/IBoardState";
import { ClosedContainer, OpenedCell } from "./Cell.styles";
import { GameResult } from "@/domain/GameResult";
import { ICell } from "@/domain/ICell";
import bomb from "@/resources/bomb.png"
import flag from "@/resources/flag.png"
import explosion from "@/resources/explosion.png"

interface CellProps {
    board: IBoardState;
    cell: ICell;
    onOpenCell: (cell: ICell) => void;
    onMarkCell: (cell: ICell) => void;
}

export const Cell = ({ board, cell, onOpenCell, onMarkCell }: CellProps) => {
    if (board.openedCells.includes(cell)) {
        return (
            <OpenedCell isBomb={cell.isBomb} bombsAround={cell.bombsAround}>
                {cell.isBomb && <img src={explosion.src} alt="explosion" />}
            </OpenedCell>
        );
    }

    if (board.markedCells.includes(cell)) {
        return (
            <ClosedContainer>
                <img src={flag.src} alt="flag" />
            </ClosedContainer>
        );
    }

    if (board.result === GameResult.Lost && cell.isBomb) {
        return (
            <ClosedContainer>
                <img src={bomb.src} alt="bomb" />
            </ClosedContainer>
        )
    }

    const onRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        onMarkCell(cell);
    };

    return <ClosedContainer onClick={() => onOpenCell(cell)} onContextMenu={onRightClick} />;
};
