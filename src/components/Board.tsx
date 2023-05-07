"use client";

import { IBoardState } from "@/domain/IBoardState";
import { DefaultBoardSize, DefaultBobmsQty, shuffle } from "@/features";
import { useEffect, useState } from "react";
import { DebugBoard, DebugBoardType } from "./DebugBoard";
import { DebugBoardsContainer } from "./DebugBoard.styles";
import { GameContainer } from "./Board.styles";

interface IBoardProps {

}

export const Board = (props: IBoardProps) => {
    const [ board, setBoard ] = useState<IBoardState | undefined>(null);
    
    useEffect(() => {
        const initBoard = shuffle(DefaultBoardSize, DefaultBobmsQty);
        setBoard(initBoard);
    }, []);

    const restart = () => {
        const initBoard = shuffle(DefaultBoardSize, DefaultBobmsQty);
        setBoard(initBoard);
    }

    const onOperCell = (x: number, y: number) => {
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
        <GameContainer>
            <div>
                {board?.cells.map((row, x) => (
                    <div style={{
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        {row.map((cell, y) => 
                        cell.isOpen
                            ? (<div style={{
                                border: "1px solid black",
                                background: cell.isBomb ? "red" : "grey",
                                height: "25px",
                                width: "25px",
                            }}>
                                {!cell.isBomb && cell.bombsAround !== 0 &&
                                    cell.bombsAround}
                            </div>)
                            : (<div style={{
                                border: "1px solid black",
                                background: "white",
                                height: "25px",
                                width: "25px",
                            }}
                                onClick={() => onOperCell(x, y)}>

                            </div>)
                        )}
                    </div>
                ))}
            </div>

            <div>
                <button onClick={restart}>Refresh</button>
            </div>
            
            <DebugBoardsContainer>
                <DebugBoard board={board} type={DebugBoardType.Bomb} />
                <DebugBoard board={board} type={DebugBoardType.BobmsAround} />
                <DebugBoard board={board} type={DebugBoardType.Opened} />
                <DebugBoard board={board} type={DebugBoardType.Marked} />
            </DebugBoardsContainer>
        </GameContainer>
    );
}

