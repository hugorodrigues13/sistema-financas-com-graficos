import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import {Container, SideLeft, Legend, LegendContainer, SideRight} from './styles'

interface IPieChartProps {
    data: {
        name: string;
        value: number;
        percent: number;
        color: string;
    }[];
}

export const PieChartGhaph = ({data}: IPieChartProps) => {
    // Check if both income and expenses are zero
    const noData = data.every(item => item.value === 0);

    return (
         <Container>
            <SideLeft>
                <h2>Relação</h2>
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
                    <PieChart>
                        <Pie 
                            data={data}
                            dataKey="percent"
                        >
                            {
                                data.map((indicator) => (
                                    <Cell key={indicator.name} fill={indicator.color} />
                                ))
                            }

                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </SideRight>
        </Container>
    );
}
        