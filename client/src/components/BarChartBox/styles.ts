import styled from "styled-components";

interface IlegendProps {
    color: string;
}

export const Container = styled.div`
    display: flex;
    width: 48%;
    min-height: 260px;

    margin: 10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    border-radius: 7px;
`;

export const SideLeft = styled.aside`
    width: 50%;
    padding: 30px 20px;

    > h2 {
        padding-left: 1rem;
        margin-bottom: 10px;
    }
    
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
    padding-left: 1rem;
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

export const SideRight = styled.main`
    flex: 1;
    min-height: 150px;
    display: flex;
    padding-top: 2.5rem;
    
`;