"use client";

import { useState } from "react";
import { DebugBoard, DebugBoardType } from "./DebugBoard";
import { DebugBoardsContainer, DebugModeButton, DebugModeButtonContainer, DebugPanelContainer } from "./DebugPanel.styles";
import { IBoardState } from "@/domain/IBoardState";

interface IDebugPanelProps {
    board?: IBoardState
}

export const DebugPanel = ({board}: IDebugPanelProps) => {
    const [ debugMode, setDebugMode ] = useState(false);

    const toggleDebugMode = () => setDebugMode(currentValue => !currentValue);

    return (
        <DebugPanelContainer isHidden={!debugMode}>
            <DebugModeButtonContainer>
                <DebugModeButton href="#" onClick={toggleDebugMode}>
                    {debugMode ? "Hide debug" : "Show debug"}
                </DebugModeButton>
            </DebugModeButtonContainer>

            <DebugBoardsContainer>
                <DebugBoard board={board} type={DebugBoardType.Bomb} />
                <DebugBoard board={board} type={DebugBoardType.BobmsAround} />
                <DebugBoard board={board} type={DebugBoardType.Opened} />
                <DebugBoard board={board} type={DebugBoardType.Marked} />
            </DebugBoardsContainer>
        </DebugPanelContainer>
    );
}

