"use client";

import { IBoardState } from "@/domain/IBoardState";
import { ResultView } from "./ResultView";
import { StatusPanelContainer } from "./StatusPanel.styles";

interface IBombsCounterProps {
    board?: IBoardState
    restart: () => void
}

export const StatusPanel = ({board, restart}: IBombsCounterProps) => {
    const bombsLeft = board ? board.bombsCount - board.markedCells.length : 0

    return (
        <StatusPanelContainer>
            <ResultView board={board} restart={restart} />
            <span>Bombs left: {bombsLeft}</span>
        </StatusPanelContainer>
    )
}
