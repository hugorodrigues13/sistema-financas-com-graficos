import React from "react";
import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from "recharts";

import { Container, SideLeft, SideRight, LegendContainer, Legend } from "./styles";
import formatCurrency from "@/utils/formatCurrency";

interface IBarChartProps {
    title: string;
    data: {
        name: string;
        amount: number | string;
        percent: number | string;
        color: string;
    }[]
}

export const BarChartBox = ({title, data}: IBarChartProps) => {
    const noData = data.every(item => item.amount === 0);

    return (
        <Container>
            <SideLeft>
                <h2>{title}</h2>
                <LegendContainer>
                   {
                    data.map((indicator) => (
                        <Legend key={indicator.name} color={indicator.color}>
                            <div>{noData ? "0%" : `${indicator.percent}%`}</div>
                            <span>{indicator.name}</span>
                        </Legend>
                    ))
                   }    
                </LegendContainer>
            </SideLeft>

            <SideRight>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <Bar dataKey="amount" name="Valor">
                            {data.map((indicator) => (
                                <Cell 
                                    key={indicator.name}
                                    fill={indicator.color}
                                />
                            ))}
                        </Bar>
                        <Tooltip
                            cursor={{fill: 'none'}}
                            formatter={(value) => formatCurrency(String(value))}/>
                    </BarChart>
                </ResponsiveContainer>
            </SideRight>
        </Container>
    )
}