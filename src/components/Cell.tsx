import { IBoardState } from "@/domain/IBoardState";
import { ClosedContainer, OpenedCell } from "./Cell.styles";
import { GameResult } from "@/domain/GameResult";
import bomb from "@/resources/bomb.png"
import flag from "@/resources/flag.png"
import explosion from "@/resources/explosion.png"
import { GameState } from "@/domain/GameState";

interface CellProps {
    board: IBoardState;
    x: number;
    y: number;
    onOpenCell: (x: number, y: number) => void;
    onMarkCell: (x: number, y: number) => void;
}

export const Cell = ({ board, x, y, onOpenCell, onMarkCell }: CellProps) => {
    const cell = board.cells[x][y];

    const onLeftClick = () => {
        onOpenCell(x, y)
    }

    const onRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (board.state === GameState.Over) {
            return;
        }

        onMarkCell(x, y);
    };

    if (board.openedCells.includes(cell)) {
        return (
            <OpenedCell isBomb={cell.isBomb} bombsAround={cell.bombsAround} onContextMenu={onRightClick}>
                {cell.isBomb && <img src={explosion.src} alt="explosion" />}
            </OpenedCell>
        );
    }

    if (board.markedCells.includes(cell)) {
        return (
            <ClosedContainer>
                <img src={flag.src} alt="flag" onContextMenu={onRightClick} />
            </ClosedContainer>
        );
    }

    if (board.result === GameResult.Lost && cell.isBomb) {
        return (
            <ClosedContainer>
                <img src={bomb.src} alt="bomb" onContextMenu={onRightClick} />
            </ClosedContainer>
        )
    }

    return <ClosedContainer onClick={onLeftClick} onContextMenu={onRightClick} />;
};
