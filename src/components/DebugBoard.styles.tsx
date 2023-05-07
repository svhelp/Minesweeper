import styled, { css } from "styled-components";

interface DebugBombCellProps {
    isBomb: boolean;
}

interface DebugOpenedCellProps {
    isOpened: boolean;
}

interface DebugMarkedCellProps {
    isMarked: boolean;
}

interface DebugBombsAroundCellProps {
    isBomb: boolean;
    bombsAround: number;
}

const BaseCell = css`
    border: 1px solid black;
    height: 25px;
    width: 25px;
`;

export const DebugBombCell = styled.div<DebugBombCellProps> `
    ${BaseCell}

    background: ${({ isBomb }) => isBomb ? "red" : "white"};
`;

export const DebugOpenedCell = styled.div<DebugOpenedCellProps> `
    ${BaseCell}

    background: ${({ isOpened }) => isOpened ? "green" : "white"};
`;

export const DebugMarkedCell = styled.div<DebugMarkedCellProps> `
    ${BaseCell}

    background: ${({ isMarked }) => isMarked ? "orange" : "white"};
`;

export const DebugBombAroundCell = styled.div<DebugBombsAroundCellProps> `
    ${BaseCell}

    background: white;

    ::after {
        content: "${({ isBomb, bombsAround }) => !!bombsAround && !isBomb && bombsAround}";
    }
`;

export const DebugBoardsContainer = styled.div`
    display: flex;

    > div {
        margin: 16px;
    }
`