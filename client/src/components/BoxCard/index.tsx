import React from "react";
import Image from "next/image";
import CountUp from 'react-countup';

import dolarImg from '@/assets/dolar.svg'
import arrowUpImg from '@/assets/arrow-up.svg'
import arrowDownImg from '@/assets/arrow-down.svg'

import { Container } from "./styles";

interface IBoxCard {
    title: string;
    amount: string; // Alterando para string
    footerLabel: string;
    icon: 'dolar' | 'arrowUp' | 'arrowDown';
    color: string;
}

export const BoxCard = ({title, amount, footerLabel, icon, color}: IBoxCard) => {

    const iconSelected = () => {
        switch (icon) {
            case 'dolar':
                return dolarImg;
            case 'arrowUp':
                return arrowUpImg;
            case 'arrowDown':
                return arrowDownImg;
            default: 
                return null;
        }
    }

    // Convertendo o valor para número e formatando para duas casas decimais antes de converter para string
    const formattedAmount = parseFloat(amount.replace('R$ ', '').replace(',', '.')).toFixed(2);

     // Verificar se o totalBalance é menor que 0 e atualizar a cor do amount
     const amountColor = parseFloat(formattedAmount) < 0 ? "#E44C4E" : "";

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
                <CountUp 
                    end={parseFloat(formattedAmount)} // Convertendo novamente para número
                    prefix="R$ "
                    separator="."
                    decimal=","
                    decimals={2}
                    style={{ color: amountColor }}
                />
            </h1>
            <small>{footerLabel}</small>
            <Image src={iconSelected()} alt={title}  priority={true} />
        </Container>
    )
}