import styled, { css } from "styled-components";

interface OpenedCellProps {
    isBomb: boolean;
    bombsAround: number;
}

export const BaseCell = css`
    height: 25px;
    width: 25px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid black;

    img {
        height: 20px;
        width: 20px;
    }
`;

export const ClosedContainer = styled.div`
    ${BaseCell}

    background: white;
`;

export const OpenedCell = styled.div<OpenedCellProps>`
    ${BaseCell}

    background: #ddd;
    
    ::after {
        content: "${({ isBomb, bombsAround }) => !!bombsAround && !isBomb && bombsAround}";
    }
`