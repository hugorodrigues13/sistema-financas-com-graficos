import prismaClient from "../../../prisma";

class ListEntryBalanceService {
    async execute(){
        const lists = await prismaClient.entryBalance.findMany({
            select: {
                id: true,
                description: true,
                amount: true,
                frequency: true,
                date: true,
                created_at: true
            }
        })

        return lists
    }
}

export {ListEntryBalanceService}