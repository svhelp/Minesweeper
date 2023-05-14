"use client";

import { IBoardState } from "@/domain/IBoardState";
import { DefaultBoardSize, DefaultBobmsQty, shuffle } from "@/features";
import { useEffect, useState } from "react";
import { DebugBoardsContainer, MainContainer } from "./GameContainer.styles";
import { Board } from "./Board";
import { DebugBoard, DebugBoardType } from "./debug/DebugBoard";

interface IGameContainerProps {

}

export const GameContainer = (props: IGameContainerProps) => {
    const [ board, setBoard ] = useState<IBoardState | undefined>(undefined);
    
    useEffect(() => {
        const initBoard = shuffle(DefaultBoardSize, DefaultBobmsQty);
        setBoard(initBoard);
    }, []);

    const restart = () => {
        const initBoard = shuffle(DefaultBoardSize, DefaultBobmsQty);
        setBoard(initBoard);
    }

    const onOpenCell = (x: number, y: number) => {
        if (!board) {
            return;
        }

        const initBoard: IBoardState = { ...board };
        
        initBoard.cells[x][y] = {
            ...initBoard.cells[x][y],
            isOpen: true,
        };

        setBoard(initBoard);
    }

    return (
        <MainContainer>
            <Board
                board={board}
                onOpenCell={onOpenCell}
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

