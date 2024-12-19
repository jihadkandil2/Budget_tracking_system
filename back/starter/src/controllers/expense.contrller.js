import { Router } from "express";
import { addexpense  , getAllExpenses , updateExpense , findByCategory} from "../services/expense.services/expense.services.js";
const router = new Router();

router.post('/add' , addexpense);
router.get('/user/:userId' , getAllExpenses);
router.patch('/update/user/:userId/:expenseId' , updateExpense)
router.get('/user/:userId/category/:category' , findByCategory)
export default router;