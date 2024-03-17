import React, { ReactNode } from 'react';
import { Container } from './styles';
import { Aside } from '../Aside';
import { Content } from '../Content';
import { MainHeader } from '../MainHeader';

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Container>
            <Aside />
            <Content>{children}</Content>
            <MainHeader />
        </Container>
    );
};