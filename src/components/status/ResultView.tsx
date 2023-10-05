"use client";

import { IBoardState } from "@/domain/IBoardState";
import { GameState } from "@/domain/GameState";
import { GameResult } from "@/domain/GameResult";
import { ResultViewContainer, ResultContainer, RestartButton } from "./ResultView.styles";


interface IResultViewProps {
    board?: IBoardState
    restart: () => void
}

export const ResultView = ({board, restart}: IResultViewProps) => {
    if (board?.state !== GameState.Over) {
        return <div></div>
    }

    const result = board.result === GameResult.Lost
        ? "You lost"
        : "You won";

    return (
        <ResultViewContainer>
            <ResultContainer result={board.result}>
                {result}
            </ResultContainer>
            <RestartButton href="#" onClick={restart}>
                Restart
            </RestartButton>
        </ResultViewContainer>
    )
}

