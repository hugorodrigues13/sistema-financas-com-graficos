import React, {ReactNode} from "react";
import {Container, TitleContainer, Controllers} from './styles'

interface ContentHeaderProps {
    title: string;
    lineColor: string;
    children: ReactNode;
}

export const ContentHeader = ({title, lineColor, children}: ContentHeaderProps) => {
    return(
        <Container>
            <TitleContainer color={lineColor}>
               <h1>{title}</h1>
            </TitleContainer>
            <Controllers>
                {children}
            </Controllers>
        </Container>
    )
}