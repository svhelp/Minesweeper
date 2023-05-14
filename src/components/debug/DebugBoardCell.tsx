import { ICell } from "@/domain/ICell";
import { DebugBombCell, DebugOpenedCell, DebugMarkedCell, DebugBombAroundCell } from "./DebugBoardCell.styles";
import { DebugBoardType } from "./DebugBoard";

interface IDebugBoardCellProps {
    cell: ICell;
    type: DebugBoardType;
}

export const DebugBoardCell = ({ cell, type }: IDebugBoardCellProps) => {
    if (type === DebugBoardType.Bomb) {
        return (
            <DebugBombCell isBomb={cell.isBomb} />
        );
    }

    if (type === DebugBoardType.Opened) {
        return (
            <DebugOpenedCell isOpened={cell.isOpen} />
        );
    }

    if (type === DebugBoardType.Marked) {
        return (
            <DebugMarkedCell isMarked={cell.isMarked} />
        );
    }

    if (type === DebugBoardType.BobmsAround) {
        return (
            <DebugBombAroundCell isBomb={cell.isBomb} bombsAround={cell.bombsAround} />
        );
    }

    return null;
};
