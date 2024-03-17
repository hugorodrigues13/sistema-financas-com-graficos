import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

export const Container = styled.div`
    grid-area: AS;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.secondary};
    border-right: 1px solid ${props => props.theme.colors.gray};
    padding-left: 1.5rem;
`;

export const Header = styled.header`
     display: flex;
     height: 70px;

     .link-home{
        display: flex;
        align-items: center;
     }
`;

export const Title = styled.h3`
    color: ${props => props.theme.colors.white};
    margin-left: 0.5rem;
`;

export const LogoImg = styled(Image)`
    height: 40px;
    width: 40px;
`;

export const MenuContainer = styled.nav`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
`;

export const MenuItemLink = styled(Link)`
    color: ${props => props.theme.colors.menu};
    margin: 7px 0;
    font-weight: bold;
    display: flex;
    align-items: center;

    transition: opacity .3s, color .3s;

    &:hover{
        opacity: .7;
        color: ${props => props.theme.colors.info};
    }

    > svg {
        font-size: 25px;
        margin: 0 0.5rem;
    }
`;