import styled from "styled-components";

interface TitleContainerProps {
    color: string;
}

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const TitleContainer = styled.div<TitleContainerProps>`
    color: ${props => props.theme.colors.white};

    &::after {
        content: '';
        display: block;
        width: 55px;
        border-bottom: 5px solid ${props => props.color};
    }
`;

export const Controllers = styled.div`
    display: flex;
`;