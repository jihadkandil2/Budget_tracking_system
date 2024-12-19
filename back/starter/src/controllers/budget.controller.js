import {Router} from 'express';
import { addBudget , getBudgets , updateBudget } from '../services/budget.services/budget.services.js';

const router=Router();

router.post('/add' , addBudget)
router.get('/user/:userId' , getBudgets)

router.patch('/update/:budgetId' , updateBudget)

export default router;