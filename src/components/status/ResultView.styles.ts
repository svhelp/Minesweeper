import { GameResult } from "@/domain/GameResult"
import styled from "styled-components"

interface IResultContainerProps {
    result?: GameResult
}

export const ResultViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ResultContainer = styled.div<IResultContainerProps>`
    font-size: 48px;
    font-weight: 900;
    color: ${({result}) => result === GameResult.Lost ? "#f00" : "#0f0"};
`

export const RestartButton = styled.a`
    display: block;

    margin: 4px;

    font-size: 12px;
    color: white;
`