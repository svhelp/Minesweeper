"use client";

import { IBoardState } from "@/domain/IBoardState";
import { DefaultBoardSize, DefaultBobmsQty, handleMarkCell } from "@/features";
import { useEffect, useState } from "react";
import { DebugBoardsContainer, MainContainer } from "./GameContainer.styles";
import { Board } from "./Board";
import { DebugBoard, DebugBoardType } from "./debug/DebugBoard";
import { createBoard } from "@/features/initializator";
import { onActivateCell } from "@/features/activator";
import { ICell } from "@/domain/ICell";

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

    const onOpenCell = (x: number, y: number) => {
        if (!board) {
            return;
        }

        const patch = onActivateCell(board, x, y);

        setBoard({
            ...board,
            ...patch
        });
    }

    const onMarkCell = (x: number, y: number) => {
        if (!board) {
            return;
        }

        const patch = handleMarkCell(board, x, y);

        setBoard({
            ...board,
            ...patch
        });
    }

    return (
        <MainContainer>
            <div>
                <span>State: </span>
                <span>{board?.state}</span>
            </div>
            
            <div>
                <span>Result: </span>
                <span>{board?.result}</span>
            </div>

            <Board
                board={board}
                onOpenCell={onOpenCell}
                onMarkCell={onMarkCell}
            />

            <div>
                <button onClick={restart}>Refresh</button>
            </div>
            
            <DebugBoardsContainer>
                <DebugBoard board={board} type={DebugBoardType.Bomb} />
                <DebugBoard board={board} type={DebugBoardType.BobmsAround} />
                <DebugBoard board={board} type={DebugBoardType.Opened} />
                <DebugBoard board={board} type={DebugBoardType.Marked} />
            </DebugBoardsContainer>
        </MainContainer>
    );
}

