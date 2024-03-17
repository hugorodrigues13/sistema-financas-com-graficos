import {
    Container,
    Header, 
    LogoImg,
    MenuContainer,
    MenuItemLink,
    Title

} from './styles';

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp

} from 'react-icons/md'
import logoImg from '@/assets/logo.svg'

export const Aside = () => {
    return (
        <Container>
            <Header>
                <MenuItemLink href="/dashboard" className='link-home'>
                    <LogoImg src={logoImg} alt="Logo Minha carteira" />
                    <Title>Minha carteira</Title>
                </MenuItemLink>
            </Header>

            <MenuContainer>
                <MenuItemLink href="/dashboard">
                        <MdDashboard/>
                        <p>Dashboard</p>
                </MenuItemLink>
                <MenuItemLink href="/entryBalance">
                        <MdArrowUpward/>
                        <p>Entradas</p>
                </MenuItemLink>
                <MenuItemLink href="/exitBalance">
                        <MdArrowDownward/>
                        <p>Saídas</p>
                </MenuItemLink>
                <MenuItemLink href="/logout">
                        <MdExitToApp/>
                        <p>Sair</p>
                </MenuItemLink>
            </MenuContainer>
        </Container>
    )
}