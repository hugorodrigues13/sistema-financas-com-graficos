import {Request, Response} from 'express'
import { CreateExitBalanceService } from '../../services/exitBalance/CreateExitBalanceService';

class CreateExitBalanceController {
    async handle(req: Request, res: Response) {
        const { frequency, description, amount, date } = req.body;

        // Convertendo a string de data "DD-MM-YYYY" para o tipo Date
        const [day, month, year] = date.split('-').map(Number);
        const parsedDate = new Date(year, month - 1, day); // Mês é baseado em zero (0 - 11)

        const createListService = new CreateExitBalanceService();

        try {
            const lists = await createListService.execute({
                frequency, 
                description,
                amount,
                date: parsedDate, // Passando a data convertida
            });

            return res.json(lists);
        } catch (error) {
            console.error('Error creating list:', error);
            return res.status(500).json({ error: 'Erro ao criar lista' });
        }
    }
}

export {CreateExitBalanceController};