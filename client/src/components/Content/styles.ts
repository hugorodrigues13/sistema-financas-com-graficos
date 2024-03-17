import styled from 'styled-components';

export const Container = styled.div`
    grid-area: CT;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary};
    padding: 1rem;

    height: calc(100vh - 70px);
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
    