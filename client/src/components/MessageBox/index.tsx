import React from "react";
import Image from "next/image";

import happyImg from '@/assets/happy.svg'

import { Container } from "./styles";

interface MessageBoxProps {
    title: string;
    description: string;
    footerText: string;
    icon: string;
}

export const MessageBox = ({title, description, footerText, icon}: MessageBoxProps) => {
    return (
        <Container>
            <header>
                <h1>
                    {title}
                    <Image className="img-card" src={icon} alt={title} />
                </h1>
                <p>{description}</p>
            </header>
            <footer>
                <p>
                    {footerText}
                </p>
            </footer>
        </Container>
    )
}