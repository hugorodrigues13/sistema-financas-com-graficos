import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Container, Content } from "./styles";

import { PieChartGhaph } from "@/components/PieChart";
import { HistoryChart } from "@/components/HistoryChart";
import { BarChartBox } from "@/components/BarChartBox"

import { ContentHeader } from '@/components/ContentHeader/intex'
import { SelectInput } from "@/components/SelectInput/intex";
import { BoxCard } from "@/components/BoxCard";
import { MessageBox } from "@/components/MessageBox";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";

import {listOfMonths} from "@/utils/months";

import happyImg from '@/assets/happy.svg'
import sadImg from '@/assets/sad.svg'
import chocadoImg from '@/assets/chocado.svg'


enum Frequency {
    Eventual = "Eventual",
    Recorrente = "Recorrente"
  }

interface DataListProps {
    id: string;
    description: string;
    amount: string;
    frequency: Frequency;
    date: Date;
}

interface ResultProps{
    entryLists: DataListProps[] | undefined,
    exitLists: DataListProps[] | undefined,
  }

export default function Dashboard({entryLists, exitLists}: ResultProps) {
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())
    const [totalExpenses, setTotalExpenses] = useState<number>(0);
    const [totalGains, setTotalGains] = useState<number>(0);

    const months = useMemo(() => {
      return listOfMonths.map(item => {
        return {
          value: item.value,
          label: item.label,
        }
      });
    }, []);
  
    const years = useMemo(() => {
      let uniqueYears: number[] = [];
  
      if (entryLists && exitLists) {
          [entryLists, exitLists].forEach(list => {
            list.forEach(item => {
              const date = new Date(item.date);
              const year = date.getFullYear();
    
              if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
              }
            });
          });
        }
    
        return uniqueYears.map(year => {
          return {
            value: year,
            label: year,
          };
        });
    }, [entryLists, exitLists]);

    const handleMonthSelected = useCallback((month: string) => {
      try {
        const parseMonth = Number(month)
        setMonthSelected(parseMonth)
      } catch (err) {
        console.log('Invalid month value: ' + err)
      }
    },[])
  
    const handleYearSelected = useCallback((year: string) => {
      try {
        const parseYear = Number(year)
        setYearSelected(parseYear)
      } catch (err) {
        console.log('Invalid year value: ' + err)
      }
    },[])

    const totalBalance = useMemo(() => {
      return totalGains - totalExpenses;
    }, [totalGains, totalExpenses]);

    const message = useMemo(() => {
        if(totalBalance < 0) {
           return {
            title: "Que triste!",
            description: "Neste mês, você gastou mais do que deveria.",
            footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
            icon: sadImg
           }

        } else if(totalGains === 0 && totalExpenses === 0) {
          return {
            title: "Ops!",
            description: "Neste mês, não há registros de entradas ou saídas.",
            footerText: "Parece que você não fez nenhum registro no mês e ano selecionado!",
            icon: chocadoImg
          }

        } else if(totalBalance === 0) {
          return {
           title: "Ufaa!",
           description: "Neste mês, você gastou exatamente o que ganhou.",
           footerText: "Tenha cuidado. No próximo mês tente poupar!",
           icon: chocadoImg
          }
          
       } else{
          return {
            title: "Muito bem!",
            description: "Sua carteira está positiva!",
            footerText: "Continue assim. Considere investir o seu saldo.",
            icon: happyImg
          }
       }

    }, [totalBalance])

    const relationExpensesGains = useMemo(() => {
      const total = totalGains + totalExpenses;
  
      const percentGains = (totalGains / total) * 100;
      const percentExpenses = (totalExpenses / total) * 100;
  
      const data = [
          {
              name: 'Entradas',
              value: totalGains,
              percent: total === 0 ? 0 : Number((percentGains).toFixed(1)),
              color: '#f7931b'
          },
          {
              name: 'Saídas',
              value: totalExpenses,
              percent: total === 0 ? 0 : Number((percentExpenses).toFixed(1)),
              color: '#e44c4e'
          }
      ];
  
      return data;
  
    }, [totalGains, totalExpenses]);

    const relationEntryEventualRecurrent = useMemo(() => {
      if (!entryLists) return [];
  
      let amountRecurrent = 0;
      let amountEventual = 0;
  
      // Filtrar despesas com base no ano e mês selecionados
      const filteredGains = entryLists.filter((gains) => {
          const date = new Date(gains.date);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          
          return month === monthSelected && year === yearSelected;
      });
  
      // Iterar sobre as despesas filtradas e calcular os totais
        filteredGains.forEach((gains) => {
          const amount = Number(gains.amount.replace("R$ ", "").replace(",", "."));

          if (gains.frequency === Frequency.Recorrente) {
              amountRecurrent += amount;
          }

          if (gains.frequency === Frequency.Eventual) {
              amountEventual += amount;
          }
      });
  
      // Calcular o total
      const total = amountRecurrent + amountEventual;
  
      return [
          {
              name: 'Recorrentes',
              amount: amountRecurrent,
              percent: Number(((amountRecurrent / total) * 100).toFixed(1)),
              color: "#40A2E3"
          },
          {
              name: 'Eventuais',
              amount: amountEventual,
              percent: Number(((amountEventual / total) * 100).toFixed(1)),
              color: "#E44C4E"
          },
      ];
  
    }, [entryLists, monthSelected, yearSelected]);

    const relationExitEventualRecurrent = useMemo(() => {
    if (!exitLists) return [];

    let amountRecurrent = 0;
    let amountEventual = 0;

    // Filtrar despesas com base no ano e mês selecionados
    const filteredExpenses = exitLists.filter((expense) => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        
        return month === monthSelected && year === yearSelected;
    });

    // Iterar sobre as despesas filtradas e calcular os totais
      filteredExpenses.forEach((expense) => {
        const amount = Number(expense.amount.replace("R$ ", "").replace(",", "."));

        // console.log("Parsed amount:", amount);
        // console.log("Expenses frequency:", expense.frequency);

        if (expense.frequency === Frequency.Recorrente) {
            amountRecurrent += amount;
        }

        if (expense.frequency === Frequency.Eventual) {
            amountEventual += amount;
        }
    });

    // Calcular o total
    const total = amountRecurrent + amountEventual;

    return [
        {
            name: 'Recorrentes',
            amount: amountRecurrent,
            percent: Number(((amountRecurrent / total) * 100).toFixed(1)),
            color: "#40A2E3"
        },
        {
            name: 'Eventuais',
            amount: amountEventual,
            percent: Number(((amountEventual / total) * 100).toFixed(1)),
            color: "#E44C4E"
        },
    ];

    }, [exitLists, monthSelected, yearSelected]);

    const historyData = useMemo(() => {
        return listOfMonths.map((_, month) => {

            let amountEntry = 0;
            if (entryLists && entryLists.length > 0) {
              entryLists.forEach(gain => {
                  const date = new Date(gain.date)
                  const gainMonth = date.getMonth();
                  const gainYear = date.getFullYear();
  
                  if (gainMonth === month && gainYear === yearSelected) {
                      try {
                        const amountWithoutCurrency = gain.amount.replace('R$', '').trim();
                        amountEntry += parseFloat(amountWithoutCurrency);
                      } catch (err) {
                          console.log('Error amountEntry deve ser um número valido', err)
                      }
                  }
              });
          }
  
          let amountOutPut = 0;
          if (exitLists && exitLists.length > 0) {
              exitLists.forEach(expense => {
                  const date = new Date(expense.date)
                  const expenseMonth = date.getMonth();
                  const expenseYear = date.getFullYear();
  
                  if (expenseMonth === month && expenseYear === yearSelected) {
                      try {
                        const amountWithoutCurrency = expense.amount.replace('R$', '').trim();
                        amountOutPut += parseFloat(amountWithoutCurrency);
                      } catch (err) {
                          console.log('Error amountOutPut deve ser um número valido', err)
                      }
                  }
              });
          }

            return {
                monthNumber: month,
                month: listOfMonths[month].label.slice(0, 3),
                amountEntry,
                amountOutPut
            }
        })
        .filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
        })
    }, [entryLists, exitLists, yearSelected])

    const fetchTotalExpenses = async () => {
      try {
          const apiClient = setupAPIClient();
          const response = await apiClient.get('/lists/exit-balance', {
              params: {
                  month: monthSelected,
                  year: yearSelected
              }
          });

          let total: number = 0;
          response.data.forEach((item: DataListProps) => {
              const date = new Date(item.date);
              const itemMonth = date.getMonth() + 1;
              const itemYear = date.getFullYear();
              if (itemMonth === monthSelected && itemYear === yearSelected) {
                  total += parseFloat(item.amount.replace('R$ ', '').replace(',', '.'));
              }
          });
          setTotalExpenses(total);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    };

    const fetchTotalGains = async () => {
      try {
          const apiClient = setupAPIClient();
          const response = await apiClient.get('/lists/entry-balance', {
              params: {
                  month: monthSelected,
                  year: yearSelected
              }
          });

          let total: number = 0;
          response.data.forEach((item: DataListProps) => {
              const date = new Date(item.date);
              const itemMonth = date.getMonth() + 1;
              const itemYear = date.getFullYear();
              if (itemMonth === monthSelected && itemYear === yearSelected) {
                  total += parseFloat(item.amount.replace('R$ ', '').replace(',', '.'));
              }
          });
          setTotalGains(total);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
        fetchTotalExpenses();
        fetchTotalGains();
    }, [entryLists, exitLists, monthSelected, yearSelected]);

    useEffect(() => {
      // Definir mês e ano selecionados com base no mês e ano atual
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      
      // Verificar se o ano atual está na lista de anos disponíveis
      const isCurrentYearAvailable = years.find(year => (year.value) === currentYear);
  
      // Se o ano atual estiver disponível, definir o ano selecionado como o ano atual,
      // caso contrário, definir o ano selecionado como o primeiro ano disponível na lista
      if (!years.find(year => (year.value) === yearSelected)) {
          if (years.length > 0) {
              setYearSelected((years[0].value));
          }
      }
  
      // Definir o mês selecionado como o mês atual
      setMonthSelected(currentMonth);
    }, []);

    return (
        <Container>
           <ContentHeader title="Dashboard" lineColor="#F7931B">
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
          </ContentHeader>

            <Content>
                <BoxCard
                    title="Saldo"
                    color="#40A2E3"
                    amount={totalBalance.toFixed(2)}
                    footerLabel="Atualizado com base nas entradas e saídas"
                    icon="dolar"
                />

                <BoxCard
                    title="Entradas"
                    color="#F7931B"
                    amount={totalGains.toFixed(2)}
                    footerLabel="Atualizado com base nas entradas"
                    icon="arrowUp"
                />

                <BoxCard
                    title="Saídas"
                    color="#E44C4E"
                    amount={totalExpenses.toFixed(2)}
                    footerLabel="Atualizado com base nas saídas"
                    icon="arrowDown"
                />

                <MessageBox
                  title={message.title}
                  description={message.description}
                  footerText={message.footerText}
                  icon={message.icon}
                />

                <PieChartGhaph data={relationExpensesGains}/>

                <HistoryChart
                  data={historyData}
                  lineColorAmountEntry="#F7931B"
                  lineColorAmountOutPut="#E44C4E"
                />

                <BarChartBox 
                    data={relationEntryEventualRecurrent}
                    title="Entradas"
                />

                <BarChartBox 
                    data={relationExitEventualRecurrent}
                    title="Saídas"
                />
            </Content>
        </Container>
        
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const entryResponse = await apiClient.get('/lists/entry-balance')
    const exitResponse = await apiClient.get('/lists/exit-balance')

    return {
        props: {
            entryLists: entryResponse.data,
            exitLists: exitResponse.data
        }
    }
})