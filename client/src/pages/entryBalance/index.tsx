import React, {useState, useEffect, useMemo} from "react";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import { Container, Content, Filters } from "./styles";
import { ContentHeader } from '@/components/ContentHeader/intex'
import { SelectInput } from "@/components/SelectInput/intex";
import { FinanceCard } from "@/components/FinanceCard";
import formatCurrency from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";
import {listOfMonths} from "@/utils/months";

import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";

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
    lists: DataListProps[] | undefined,
  }

export default function EntryBalance({lists}: ResultProps) {
    const [data, setData] = useState<DataListProps[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1)
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear())

    const [selectedFrequency, setSelectedFrequency] = useState(['Recorrente', 'Eventual'])
    const title = 'Entradas';
    const tagColor = (frequency: Frequency) => frequency === Frequency.Recorrente ? '#40A2E3' : '#E44C4E';

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
    
        lists?.forEach(item => {
          const date = new Date(item.date);
          const year = date.getFullYear();
    
          if (!uniqueYears.includes(year)) {
            uniqueYears.push(year);
          }
        });
    
        return uniqueYears.map(year => {
          return {
            value: year,
            label: year,
          }
        });
      }, [lists])

      const handleMonthSelected = (month: string) => {
        try {
          const parseMonth = Number(month)
          setMonthSelected(parseMonth)
        } catch (err) {
          console.log('Invalid month value: ' + err)
        }
      }
    
      const handleYearSelected = (year: string) => {
        try {
          const parseYear = Number(year)
          setYearSelected(parseYear)
        } catch (err) {
          console.log('Invalid year value: ' + err)
        }
      }

      const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency)

        if(alreadySelected >= 0){
            const filtered = selectedFrequency.filter(item => item !== frequency);
            setSelectedFrequency(filtered)

            console.log('DADOS' + alreadySelected)
        }else{
            setSelectedFrequency((prev) => [...prev, frequency])
        }
      }

      const handleDeleteItem = async (listId: string) => {
        try {
            // Chamar a API para excluir o item
            const apiClient = setupAPIClient();
            await apiClient.delete(`/entry-balance/remove?order_id=${listId}`);

            // Atualizar os dados após a exclusão
            const updatedData = data.filter(item => item.id !== listId);
            
            // Recalcular o total após a exclusão
            const newTotalAmount = updatedData.reduce((total, item) => {
              return total + parseFloat(item.amount.replace('R$ ', '').replace(',', '.'));
            }, 0);

            setData(updatedData);
            setTotalAmount(newTotalAmount);
            
            // Exibir uma mensagem de sucesso ou atualizar a interface de usuário conforme necessário
            toast.success('Registro excluído com sucesso!');
            
        } catch (error) {
            console.error('Erro ao excluir registro:', error);
            toast.error('Erro ao excluir registro. Tente novamente.');
        }
    };

      const fetchOrders = async () => {
        try {
          const apiClient = setupAPIClient();
          const response = await apiClient.get('/lists/entry-balance', {
            params: {
              month: monthSelected,
              year: yearSelected
            }
          });
          
          // Filtrar os dados com base no mês e ano selecionados
           let filteredData: DataListProps[] = await response.data.filter((item: DataListProps) => {
            const date = new Date(item.date);
            const itemMonth = date.getMonth() + 1;
            const itemYear = date.getFullYear();
      
            return itemMonth === monthSelected && itemYear === yearSelected;
          });

           // Filtrar os dados com base na frequência selecionada
          filteredData = filteredData.filter(item => selectedFrequency.includes(item.frequency));

          // Calcular o valor total
          let total = 0;
            filteredData.forEach(item => {
                const amountWithoutCurrency = item.amount.replace('R$ ', '').replace(',', '.');
                total += parseFloat(amountWithoutCurrency);
            });

          setTotalAmount(total);
          setData(filteredData);

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        fetchOrders();
      }, [lists, monthSelected, yearSelected, selectedFrequency]);

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
            <ContentHeader title={title} lineColor="#40A2E3">
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)} defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected}/>
            </ContentHeader>

            <Filters>
                <div className="header-left">
                    <button>Criar novo</button>
                    <span>filtros</span>
                </div>
                <div className="header-right">
                   <div>
                        <button
                            type="button"
                            className={`tag-filter tag-filter-recorrente ${selectedFrequency.includes('Recorrente') && 'tag-actived'}`}
                            onClick={() => handleFrequencyClick('Recorrente')}
                        >
                            Recorrentes
                        </button>
                        <button
                            type="button"
                            className={`tag-filter tag-filter-eventual ${selectedFrequency.includes('Eventual') && 'tag-actived'}`}
                            onClick={() => handleFrequencyClick('Eventual')}
                        >
                            Eventuais
                        </button>
                   </div>
                   <h1>Total: {formatCurrency(totalAmount)}</h1>
                </div>
            </Filters>
                <Content>
                            {
                        data.length === 0 ? (
                            <p>Nenhum registro cadastrado nesse mês...</p>
                        ) : (
                            data.map(item => (
                                <FinanceCard
                                key={item.id}
                                tagColor={tagColor(item.frequency)}
                                title={item.description}
                                subtitle={formatDate(item.date)}
                                amount={formatCurrency(item.amount)}
                                onDelete={() => {handleDeleteItem(item.id)}} // Passa uma função de exclusão que recebe o id do item como argumento
                                />
                            ))
                            )
                        }
            </Content>
        </Container>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/lists/entry-balance')

    return {
        props: {
            lists: response.data
        }
    }
})