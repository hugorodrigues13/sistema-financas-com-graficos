import { Request, Response } from "express";
import { RemoveEntryBalanceService } from "../../services/entryBalance/RemoveEntryBalanceService";

class RemoveEntryBalanceController{
    async handle(req: Request, res: Response){
        const order_id = req.query.order_id as string;

        const removeList = new RemoveEntryBalanceService()

        const list = await removeList.execute({
            order_id
        })

        return res.json(list)
    }
}

export {RemoveEntryBalanceController}