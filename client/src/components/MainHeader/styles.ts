import styled from 'styled-components';

export const Container = styled.div`
    grid-area: MH;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.secondary};
    border-bottom: 1px solid ${props => props.theme.colors.gray};

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.2rem;
`;

export const Profile = styled.div`

`;

export const Welcome = styled.h3`

`;

export const UserName = styled.span`

`;