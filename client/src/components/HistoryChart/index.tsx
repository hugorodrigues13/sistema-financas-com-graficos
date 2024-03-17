import React from "react";

import { ResponsiveContainer, XAxis, Line, LineChart, CartesianGrid, Tooltip } from "recharts";

import { Container, Header, LegendContainer, Legend } from "./styles";

import formatCurrency from "@/utils/formatCurrency";

interface IHistoryBoxProps {
    data: {
        month: string;
        amountEntry: number | string;
        amountOutPut: number | string;
    }[],
    lineColorAmountEntry: string;
    lineColorAmountOutPut: string;
}

export const HistoryChart = ({data, lineColorAmountEntry, lineColorAmountOutPut}: IHistoryBoxProps) => {
    return (
        <Container>
            <Header>
                <h2>Histórico do saldo</h2>
                <LegendContainer>
                    <Legend color={lineColorAmountEntry}>
                        <div></div>
                        <span>Entradas</span>
                    </Legend>
                    <Legend color={lineColorAmountOutPut}>
                        <div></div>
                        <span>Saídas</span>
                    </Legend>
                </LegendContainer>
            </Header>

            <ResponsiveContainer>
                <LineChart data={data} margin={{top: 5, right: 20, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
                    <XAxis dataKey="month" stroke="#cecece" />
                    <Tooltip formatter={(value) => formatCurrency(String(value))}/>

                    <Line
                        type="monotone"
                        dataKey="amountEntry"
                        name="Entradas"
                        stroke={lineColorAmountEntry}
                        strokeWidth={5}
                        dot={{ r: 5}}
                        activeDot={{ r: 8 }}
                    />

                    <Line
                        type="monotone"
                        dataKey="amountOutPut"
                        name="Saídas"
                        stroke={lineColorAmountOutPut}
                        strokeWidth={5}
                        dot={{ r: 5}}
                        activeDot={{ r: 8 }}
                    />

                    
                </LineChart>
            </ResponsiveContainer>
        </Container>
    )
}