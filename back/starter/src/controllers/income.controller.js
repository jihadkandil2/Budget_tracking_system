import {Router} from 'express';
import { addIncome , getAllIncomes , updateIncomes } from '../services/income.services/income.services.js';
const router=Router();

router.post('/add' , addIncome)
router.get('/user/:userId' , getAllIncomes)
router.patch('/update/:incomeId',updateIncomes)


export default router;