import styled from "styled-components";

interface IDebugPanelContainerProps {
    isHidden?: boolean
}

export const DebugPanelContainer = styled.div<IDebugPanelContainerProps>`
    position: fixed;
    width: 100%;

    bottom: 0;

    transform: translate(0, ${({isHidden}) => isHidden ? "282px" : "0"});

    transition: transform 0.5s ease-out;
`

export const DebugBoardsContainer = styled.div`
    display: flex;
    justify-content: center;

    background: #333;

    > div {
        margin: 16px;
    }
`

export const DebugModeButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;

`

export const DebugModeButton = styled.a`
    display: block;
    
    margin: 4px;

    font-size: 12px;
    color: white;
`
