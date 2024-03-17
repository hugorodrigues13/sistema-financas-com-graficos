import { Frequency } from "@prisma/client";
import prismaClient from "../../../prisma";

interface ListRequest {
    description: string;
    amount: string;
    frequency: Frequency;
    date: Date;
}

class CreateExitBalanceService {
  async execute({ description, amount, frequency, date }: ListRequest) {
      try {
          const lists = await prismaClient.exitBalance.create({
              data: {
                  description,
                  amount,
                  frequency,
                  date,
              },
          });

          console.log('Lista criada:', lists);

          return lists;
      } catch (error) {
          console.error('Erro ao criar lista:', error);
      }
  }
}

export { CreateExitBalanceService };