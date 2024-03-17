import { Request, Response } from "express";
import { RemoveExitBalanceService } from "../../services/exitBalance/RemoveExitBalanceService";

class RemoveExitBalanceController{
    async handle(req: Request, res: Response){
        const order_id = req.query.order_id as string;

        const removeList = new RemoveExitBalanceService()

        const list = await removeList.execute({
            order_id
        })

        return res.json(list)
    }
}

export {RemoveExitBalanceController}