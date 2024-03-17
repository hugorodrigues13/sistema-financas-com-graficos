import {Router, Request, Response} from 'express'
import { isAuthenticated } from './middlewares/isAuthenticated';
import { CreateEntryBalanceController } from './controllers/entryBalance/CreateEntryBalanceController';
import { CreateUserController } from './controllers/users/CreateUserController';
import { DetailUserController } from './controllers/users/DetailUserController';
import { AuthUserController } from './controllers/users/AuthUserController';
import { RemoveEntryBalanceController } from './controllers/entryBalance/RemoveEntryBalanceController';
import { ListEntryBalanceController } from './controllers/entryBalance/ListEntryBalanceController';
import { ListExitBalanceController } from './controllers/exitBalance/ListExitBalanceController';
import { CreateExitBalanceController } from './controllers/exitBalance/CreateExitBalanceController';
import { RemoveExitBalanceController } from './controllers/exitBalance/RemoveExitBalanceController';

const router = Router();

// ROTAS USER
router.post('/session', new AuthUserController().handle)
router.post('/users', new CreateUserController().handle)
router.get('/user/detail', isAuthenticated, new DetailUserController().handle)

// ROTAS ENTRY-BALANCE
router.post('/entry-balance',isAuthenticated, new CreateEntryBalanceController().handle)
router.delete('/entry-balance/remove', isAuthenticated, new RemoveEntryBalanceController().handle)
router.get('/lists/entry-balance', isAuthenticated, new ListEntryBalanceController().handle)

// ROTAS EXIT-BALANCE
router.post('/exit-balance',isAuthenticated, new CreateExitBalanceController().handle)
router.delete('/exit-balance/remove', isAuthenticated, new RemoveExitBalanceController().handle)
router.get('/lists/exit-balance', isAuthenticated, new ListExitBalanceController().handle)


export {router}