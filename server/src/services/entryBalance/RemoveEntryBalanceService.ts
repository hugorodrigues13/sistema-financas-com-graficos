import prismaClient from "../../../prisma";

interface EntryRequest {
    order_id:  string;
}

class RemoveEntryBalanceService {
    async execute({order_id}: EntryRequest){

        const list = await prismaClient.entryBalance.delete({
            where: {
                id: order_id,
            }
        })

        return list
    }   
}

export {RemoveEntryBalanceService}