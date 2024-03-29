"use client";

import { IBoardState } from "@/domain/IBoardState";
import { DefaultBoardSize, DefaultBobmsQty, createBoard, handleMarkCell, onActivateCell } from "@/features";
import { useEffect, useState } from "react";
import { MainContainer } from "./GameContainer.styles";
import { Board } from "./Board";
import { DebugPanel } from "./debug/DebugPanel";
import { StatusPanel } from "./status/StatusPanel";

interface IGameContainerProps {

}

export const GameContainer = (props: IGameContainerProps) => {
    const [ board, setBoard ] = useState<IBoardState | undefined>(undefined);
    
    useEffect(() => {
        const initBoard = createBoard(DefaultBoardSize, DefaultBobmsQty);
        setBoard(initBoard);
    }, []);

    const restart = () => {
        const initBoard = createBoard(DefaultBoardSize, DefaultBobmsQty);
        setBoard(initBoard);
    }

    const onCellClicked = (patchCreator: (board: IBoardState, x: number, y: number) => Partial<IBoardState> | undefined, x: number, y: number) => {
        if (!board) {
            return;
        }

        const patch = patchCreator(board, x, y);

        setBoard({
            ...board,
            ...patch
        });
    }

    const onOpenCell = (x: number, y: number) => onCellClicked(onActivateCell, x, y);

    const onMarkCell = (x: number, y: number) => onCellClicked(handleMarkCell, x, y);

    return (
        <MainContainer>
            <StatusPanel board={board} restart={restart} />

            <Board
                board={board}
                onOpenCell={onOpenCell}
                onMarkCell={onMarkCell}
            />
            
            <DebugPanel board={board} />
        </MainContainer>
    );
}
