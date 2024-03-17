import styled from "styled-components";

interface IlegendProps {
    color: string;
}

export const Container = styled.div`
    width: 48%;
    height: 260px;

    margin: 10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;

    display: flex;

`;

export const SideLeft = styled.aside`
    padding: 30px 20px;

    > h2 {
        margin-bottom: 20px;
    }

`;

export const SideRight = styled.main`
    display: flex;
    flex: 1;
    justify-content: center;
`;

export const LegendContainer = styled.ul`
    list-style: none;

    max-height: 170px;

    overflow-y: auto;
    
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: ${props => props.theme.colors.secondary} ${props => props.theme.colors.tertiary}; /* Firefox */
    &::-webkit-scrollbar {
        width: 10px; /* Largura da barra de rolagem */
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.secondary}; /* Cor do polegar da barra de rolagem */
        border-radius: 5px; /* Raio de borda do polegar */
    }
    &::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.tertiary}; /* Cor da trilha da barra de rolagem */
    }

`;

export const Legend = styled.li<IlegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;

    > div {
        background-color: ${props => props.color};

        width: 60px;
        height: 40px;
        border-radius: 5px;

        font-size: 18px;
        line-height: 40px;
        text-align: center;
    }

    > span {
        margin: 0 8px;
    }

`;