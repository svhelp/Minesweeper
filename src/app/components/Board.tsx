"use client";

import { IBoardState } from "@/domain/IBoardState";
import { DefaultBoardSize, DefaultBobmsQty, shuffle } from "@/features";
import { useEffect, useState } from "react";

interface IBoardProps {

}

export const Board = (props: IBoardProps) => {
    const [ board, setBoard ] = useState<IBoardState>();
    
    useEffect(() => {
        //const initBoard = shuffle(DefaultBoardSize, DefaultBobmsQty);
        //setBoard(initBoard);
    }, []);

    const restart = () => {
        const initBoard = shuffle(DefaultBoardSize, DefaultBobmsQty);
        setBoard(initBoard);
    }

    return (
        <div>
            <div>
                {board?.cells.map(row => (
                    <div style={{
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        {row.map(cell => (
                            <div style={{
                                border: "1px solid black",
                                background: cell.isBomb ? "red" : "grey",
                                height: "25px",
                                width: "25px",
                            }}>
                                {!cell.isBomb && cell.bombsAround !== 0 &&
                                    cell.bombsAround}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div>
                <button onClick={restart}>Refresh</button>
            </div>
        </div>
    );
}

