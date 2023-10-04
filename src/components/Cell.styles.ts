import styled, { css } from "styled-components";

interface OpenedCellProps {
    isBomb: boolean;
    bombsAround: number;
}

export const BaseCell = css`
    border: 1px solid black;
    height: 25px;
    width: 25px;
`;

export const ClosedCell = styled.div`
    ${BaseCell}

    background: white;
`

export const MarkedCell = styled.div`
    ${BaseCell}

    background: green;
`

export const OpenedCell = styled.div<OpenedCellProps>`
    ${BaseCell}

    background: ${({ isBomb }) => isBomb ? "red" : "grey"};
    
    ::after {
        content: "${({ isBomb, bombsAround }) => !!bombsAround && !isBomb && bombsAround}";
    }
`