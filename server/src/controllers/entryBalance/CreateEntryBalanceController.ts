import {Request, Response} from 'express'
import { CreateEntryBalanceService } from '../../services/entryBalance/CreateEntryBalanceService'

class CreateEntryBalanceController{
    async handle(req: Request, res: Response){
        const {frequency, description, amount, date} = req.body;

        // Convertendo a string de data "DD-MM-YYYY" para o tipo Date
        const[day, month, year] = date.split('-').map(Number);
        const parsedDate = new Date(year, month - 1, day) // Mês é baseado em zero (0 - 11)

        const createListService = new CreateEntryBalanceService()

        try{
            const lists = await createListService.execute({
                frequency, 
                description,
                amount,
                date: parsedDate,
            })
    
            return res.json(lists)
        }catch(err){
            console.log('Error ao criar a lista (controller): ', err)
        }
        
    }
}

export {CreateEntryBalanceController}