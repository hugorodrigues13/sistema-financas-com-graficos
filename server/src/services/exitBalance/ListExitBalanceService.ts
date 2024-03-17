import prismaClient from "../../../prisma";

class ListExitBalanceService {
    async execute(){
        const lists = await prismaClient.exitBalance.findMany({
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

export {ListExitBalanceService}