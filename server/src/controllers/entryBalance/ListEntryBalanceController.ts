import { Request, Response } from "express";
import { ListEntryBalanceService } from "../../services/entryBalance/ListEntryBalanceService";

class ListEntryBalanceController{
    async handle(req: Request, res: Response){
        const listByService = new ListEntryBalanceService()

        const lists = await listByService.execute()

        return res.json(lists)
    }
}

export {ListEntryBalanceController}