import { ICell } from "@/domain/ICell";
import { DebugBombCell, DebugOpenedCell, DebugMarkedCell, DebugBombAroundCell } from "./DebugBoardCell.styles";
import { DebugBoardType } from "./DebugBoard";
import { IBoardState } from "@/domain/IBoardState";

interface IDebugBoardCellProps {
    board: IBoardState;
    cell: ICell;
    type: DebugBoardType;
}

export const DebugBoardCell = ({ board, cell, type }: IDebugBoardCellProps) => {
    if (type === DebugBoardType.Bomb) {
        return (
            <DebugBombCell isBomb={cell.isBomb} />
        );
    }

    if (type === DebugBoardType.Opened) {
        return (
            <DebugOpenedCell isOpened={board.openedCells.includes(cell)} />
        );
    }

    if (type === DebugBoardType.Marked) {
        return (
            <DebugMarkedCell isMarked={board.markedCells.includes(cell)} />
        );
    }

    if (type === DebugBoardType.BobmsAround) {
        return (
            <DebugBombAroundCell isBomb={cell.isBomb} bombsAround={cell.bombsAround} />
        );
    }

    return null;
};
