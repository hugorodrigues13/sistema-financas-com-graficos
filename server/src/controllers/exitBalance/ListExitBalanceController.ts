import { Request, Response } from "express";
import { ListExitBalanceService } from "../../services/exitBalance/ListExitBalanceService";

class ListExitBalanceController{
    async handle(req: Request, res: Response){
        const listByService = new ListExitBalanceService()

        const lists = await listByService.execute()

        return res.json(lists)
    }
}

export {ListExitBalanceController}