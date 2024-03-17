import prismaClient from "../../../prisma";

interface ExitRequest {
    order_id:  string;
}

class RemoveExitBalanceService {
    async execute({order_id}: ExitRequest){

        const list = await prismaClient.exitBalance.delete({
            where: {
                id: order_id,
            }
        })

        return list
    }   
}

export {RemoveExitBalanceService}