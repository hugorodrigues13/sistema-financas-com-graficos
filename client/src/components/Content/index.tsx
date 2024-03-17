import React, {ReactNode} from 'react'

import {Container} from './styles'

interface ChildrenProps {
    children: ReactNode;
}

export const Content = ({children}: ChildrenProps) => {
    return (
        <Container>
           {children}
        </Container>
    )
}