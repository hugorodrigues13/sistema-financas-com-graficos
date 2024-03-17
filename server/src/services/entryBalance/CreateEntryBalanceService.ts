
import { Frequency} from "@prisma/client";
import prismaClient from "../../../prisma";

interface ListRequest {
    description: string;
    amount: string;
    frequency: Frequency;
    date: Date;
  }
  
  class CreateEntryBalanceService {
    async execute({ description, amount, frequency, date }: ListRequest) {
      try{
        const lists = await prismaClient.entryBalance.create({
          data: {
              description, 
              amount, 
              frequency, 
              date,
          },
        });

        console.log('Lista criada:', lists);
  
        return lists;

      }catch(err){
        console.log('Erro ao criar a lista (service): ', err)
      }
    }
  }
  
  export { CreateEntryBalanceService };